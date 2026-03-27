// backend/src/routes/sitemap.routes.ts

import { FastifyInstance } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SITE = "https://www.maturapolski.pl";

const STATIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/baza-wiedzy", priority: "0.9", changefreq: "weekly" },
  { path: "/test", priority: "0.9", changefreq: "weekly" },
  { path: "/epoki", priority: "0.8", changefreq: "monthly" },
  { path: "/poradnik", priority: "0.8", changefreq: "weekly" },
  { path: "/arkusze", priority: "0.8", changefreq: "monthly" },
  { path: "/materialy", priority: "0.7", changefreq: "monthly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/cookies", priority: "0.3", changefreq: "yearly" },
  { path: "/rodo", priority: "0.3", changefreq: "yearly" },
];

function url(
  loc: string,
  opts: { lastmod?: string; changefreq?: string; priority?: string } = {},
) {
  let xml = `  <url>\n    <loc>${loc}</loc>\n`;
  if (opts.lastmod) xml += `    <lastmod>${opts.lastmod}</lastmod>\n`;
  if (opts.changefreq)
    xml += `    <changefreq>${opts.changefreq}</changefreq>\n`;
  if (opts.priority) xml += `    <priority>${opts.priority}</priority>\n`;
  xml += `  </url>`;
  return xml;
}

function wrap(urls: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}

export async function sitemapRoutes(fastify: FastifyInstance) {
  fastify.get("/sitemap_index.xml", async (_req, reply) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${SITE}/sitemap-static.xml</loc></sitemap>
  <sitemap><loc>${SITE}/sitemap-baza-wiedzy.xml</loc></sitemap>
  <sitemap><loc>${SITE}/sitemap-testy.xml</loc></sitemap>
  <sitemap><loc>${SITE}/sitemap-epoki.xml</loc></sitemap>
  <sitemap><loc>${SITE}/sitemap-poradnik.xml</loc></sitemap>
  <sitemap><loc>${SITE}/sitemap-arkusze.xml</loc></sitemap>
</sitemapindex>`;
    reply.header("Content-Type", "application/xml").send(xml);
  });

  fastify.get("/sitemap-static.xml", async (_req, reply) => {
    const urls = STATIC_PAGES.map((p) =>
      url(`${SITE}${p.path}`, {
        changefreq: p.changefreq,
        priority: p.priority,
      }),
    );
    reply.header("Content-Type", "application/xml").send(wrap(urls));
  });

  // Baza wiedzy: hubs + pages
  fastify.get("/sitemap-baza-wiedzy.xml", async (_req, reply) => {
    const hubs = await prisma.contentHub.findMany({
      where: {
        isPublished: true,
        type: { in: ["LITERARY_WORK", "EPOCH", "AUTHOR", "THEME", "GENRE"] },
      },
      select: {
        slug: true,
        updatedAt: true,
        pages: {
          where: { isPublished: true },
          select: { slug: true, updatedAt: true },
        },
      },
    });

    const urls: string[] = [];
    for (const hub of hubs) {
      if (!hub.slug) continue;
      urls.push(
        url(`${SITE}/baza-wiedzy/${hub.slug}`, {
          lastmod: hub.updatedAt.toISOString().split("T")[0],
          changefreq: "weekly",
          priority: "0.8",
        }),
      );
      for (const page of hub.pages) {
        urls.push(
          url(`${SITE}/baza-wiedzy/${hub.slug}/${page.slug}`, {
            lastmod: page.updatedAt.toISOString().split("T")[0],
            changefreq: "monthly",
            priority: "0.7",
          }),
        );
      }
    }
    reply.header("Content-Type", "application/xml").send(wrap(urls));
  });

  // Testy z lektur
  fastify.get("/sitemap-testy.xml", async (_req, reply) => {
    const tests = await prisma.testLanding.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const urls = tests.map((t) =>
      url(`${SITE}/test/${t.slug}`, {
        lastmod: t.updatedAt.toISOString().split("T")[0],
        changefreq: "monthly",
        priority: "0.8",
      }),
    );
    reply.header("Content-Type", "application/xml").send(wrap(urls));
  });

  // Epoki
  fastify.get("/sitemap-epoki.xml", async (_req, reply) => {
    const epochs = [
      "starozytnosc",
      "sredniowiecze",
      "renesans",
      "barok",
      "oswiecenie",
      "romantyzm",
      "pozytywizm",
      "mloda-polska",
      "dwudziestolecie-miedzywojenne",
      "wspolczesnosc",
    ];
    const urls = epochs.map((e) =>
      url(`${SITE}/epoki/${e}`, { changefreq: "monthly", priority: "0.7" }),
    );
    reply.header("Content-Type", "application/xml").send(wrap(urls));
  });

  // Poradnik (GUIDE pages)
  fastify.get("/sitemap-poradnik.xml", async (_req, reply) => {
    const guideHubs = await prisma.contentHub.findMany({
      where: { type: "GUIDE", isPublished: true },
      select: { id: true },
    });
    const hubIds = guideHubs.map((h) => h.id);

    const articles = await prisma.contentPage.findMany({
      where: { hubId: { in: hubIds }, isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const urls = articles.map((a) =>
      url(`${SITE}/poradnik/${a.slug}`, {
        lastmod: a.updatedAt.toISOString().split("T")[0],
        changefreq: "monthly",
        priority: "0.7",
      }),
    );
    reply.header("Content-Type", "application/xml").send(wrap(urls));
  });

  // Arkusze maturalne
  fastify.get("/sitemap-arkusze.xml", async (_req, reply) => {
    const sheets = await prisma.contentHub.findMany({
      where: { type: "EXAM_SHEET", isPublished: true },
      select: { slug: true, updatedAt: true },
    });

    const urls = sheets.map((s) =>
      url(`${SITE}/arkusze/${s.slug}`, {
        lastmod: s.updatedAt.toISOString().split("T")[0],
        changefreq: "yearly",
        priority: "0.6",
      }),
    );
    reply.header("Content-Type", "application/xml").send(wrap(urls));
  });
}
