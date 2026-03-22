// backend/src/routes/emailWebhook.routes.ts
// PUBLICZNY ENDPOINT — bez auth! SNS nie wysyła JWT.

import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import https from "https";
import http from "http";

export async function emailWebhookRoutes(fastify: FastifyInstance) {
  // ================================================================
  // POST /api/email/webhook/sns
  // Odbiera powiadomienia z AWS SNS (bounce, complaint, delivery, open, click)
  // ================================================================
  fastify.post("/webhook/sns", async (request, reply) => {
    try {
      const body = request.body as any;

      // SNS wysyła Content-Type: text/plain, więc body może być stringiem
      const message = typeof body === "string" ? JSON.parse(body) : body;

      // --------------------------------------------------------
      // 1. SUBSCRIPTION CONFIRMATION
      //    SNS wyśle to po utworzeniu subskrypcji — musimy potwierdzić
      // --------------------------------------------------------
      if (message.Type === "SubscriptionConfirmation") {
        console.log("📬 SNS SubscriptionConfirmation received");
        console.log("   TopicArn:", message.TopicArn);
        console.log("   SubscribeURL:", message.SubscribeURL);

        // Automatycznie potwierdź subskrypcję
        await confirmSubscription(message.SubscribeURL);
        console.log("✅ SNS Subscription confirmed!");

        return reply.code(200).send({ status: "confirmed" });
      }

      // --------------------------------------------------------
      // 2. NOTIFICATION — właściwe eventy
      // --------------------------------------------------------
      if (message.Type === "Notification") {
        const notification = JSON.parse(message.Message);
        const eventType = notification.eventType || notification.notificationType;

        console.log(`📨 SES Event: ${eventType}`);

        switch (eventType) {
          case "Bounce":
            await handleBounce(notification);
            break;
          case "Complaint":
            await handleComplaint(notification);
            break;
          case "Delivery":
            await handleDelivery(notification);
            break;
          case "Open":
            await handleOpen(notification);
            break;
          case "Click":
            await handleClick(notification);
            break;
          default:
            console.log(`  Unknown event type: ${eventType}`);
        }
      }

      return reply.code(200).send({ status: "ok" });
    } catch (error) {
      console.error("❌ SNS Webhook error:", error);
      // Zawsze zwracaj 200 — inaczej SNS będzie retry'ować
      return reply.code(200).send({ status: "error" });
    }
  });
}

// ================================================================
// HANDLERS
// ================================================================

async function handleBounce(notification: any) {
  const bounce = notification.bounce;
  const mail = notification.mail;

  if (!bounce || !bounce.bouncedRecipients) return;

  for (const recipient of bounce.bouncedRecipients) {
    const email = recipient.emailAddress?.toLowerCase();
    if (!email) continue;

    console.log(
      `  🔴 BOUNCE: ${email} | Type: ${bounce.bounceType} | Sub: ${bounce.bounceSubType}`,
    );

    // Znajdź usera po emailu
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    // Zapisz event
    await prisma.emailEvent.create({
      data: {
        recipientEmail: email,
        userId: user?.id,
        eventType: "BOUNCE",
        bounceType: bounce.bounceType,        // "Permanent" | "Transient"
        bounceSubType: bounce.bounceSubType,  // "General" | "NoEmail" | "Suppressed"
        sesMessageId: mail?.messageId,
        rawData: { bounce, mailHeaders: mail?.commonHeaders },
      },
    });

    // HARD BOUNCE → dodaj do suppression list + wyłącz maile
    if (bounce.bounceType === "Permanent") {
      await addToSuppression(email, "HARD_BOUNCE");

      // Wyłącz emaile dla tego usera
      if (user?.id) {
        await prisma.emailPreference.updateMany({
          where: { userId: user.id },
          data: { allEmails: false },
        });
        console.log(`  ⛔ Disabled emails for user ${user.id} (hard bounce)`);
      }
    }
  }
}

async function handleComplaint(notification: any) {
  const complaint = notification.complaint;
  const mail = notification.mail;

  if (!complaint || !complaint.complainedRecipients) return;

  for (const recipient of complaint.complainedRecipients) {
    const email = recipient.emailAddress?.toLowerCase();
    if (!email) continue;

    console.log(
      `  🟠 COMPLAINT: ${email} | Type: ${complaint.complaintFeedbackType || "unknown"}`,
    );

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    await prisma.emailEvent.create({
      data: {
        recipientEmail: email,
        userId: user?.id,
        eventType: "COMPLAINT",
        complaintType: complaint.complaintFeedbackType,
        sesMessageId: mail?.messageId,
        rawData: { complaint, mailHeaders: mail?.commonHeaders },
      },
    });

    // Complaint = ZAWSZE blokuj
    await addToSuppression(email, "COMPLAINT");

    if (user?.id) {
      await prisma.emailPreference.updateMany({
        where: { userId: user.id },
        data: { allEmails: false },
      });
      console.log(`  ⛔ Disabled emails for user ${user.id} (complaint)`);
    }
  }
}

async function handleDelivery(notification: any) {
  const delivery = notification.delivery;
  const mail = notification.mail;

  if (!delivery || !delivery.recipients) return;

  for (const email of delivery.recipients) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });

    await prisma.emailEvent.create({
      data: {
        recipientEmail: email.toLowerCase(),
        userId: user?.id,
        eventType: "DELIVERY",
        sesMessageId: mail?.messageId,
        rawData: {
          processingTimeMillis: delivery.processingTimeMillis,
          smtpResponse: delivery.smtpResponse,
        },
      },
    });
  }
}

async function handleOpen(notification: any) {
  const open = notification.open;
  const mail = notification.mail;

  if (!mail?.destination) return;

  for (const email of mail.destination) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });

    await prisma.emailEvent.create({
      data: {
        recipientEmail: email.toLowerCase(),
        userId: user?.id,
        eventType: "OPEN",
        sesMessageId: mail?.messageId,
        rawData: {
          ipAddress: open?.ipAddress,
          userAgent: open?.userAgent,
        },
      },
    });
  }
}

async function handleClick(notification: any) {
  const click = notification.click;
  const mail = notification.mail;

  if (!mail?.destination) return;

  for (const email of mail.destination) {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { id: true },
    });

    await prisma.emailEvent.create({
      data: {
        recipientEmail: email.toLowerCase(),
        userId: user?.id,
        eventType: "CLICK",
        sesMessageId: mail?.messageId,
        rawData: {
          link: click?.link,
          ipAddress: click?.ipAddress,
          userAgent: click?.userAgent,
        },
      },
    });
  }
}

// ================================================================
// HELPERS
// ================================================================

async function addToSuppression(
  email: string,
  reason: "HARD_BOUNCE" | "COMPLAINT" | "MANUAL",
) {
  await prisma.emailSuppression.upsert({
    where: { email: email.toLowerCase() },
    update: {
      occurrences: { increment: 1 },
      lastEventAt: new Date(),
      reason, // nadpisz — complaint jest gorszy niż bounce
    },
    create: {
      email: email.toLowerCase(),
      reason,
    },
  });
}

async function confirmSubscription(subscribeUrl: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const lib = subscribeUrl.startsWith("https") ? https : http;
    lib
      .get(subscribeUrl, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          console.log("  SNS confirmation response:", res.statusCode);
          resolve();
        });
      })
      .on("error", (err) => {
        console.error("  SNS confirmation error:", err);
        reject(err);
      });
  });
}
