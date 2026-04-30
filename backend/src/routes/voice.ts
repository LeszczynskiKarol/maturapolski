import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import Anthropic from "@anthropic-ai/sdk";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎤 Voice Assistant Routes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const claude = new Anthropic({
  apiKey: process.env.VOICE_ANTHROPIC_API_KEY,
});

// ── Typy ──────────────────────────────────────────────────────

interface VoiceAction {
  action: string;
  params: Record<string, any>;
  status?: "success" | "error";
  result?: any;
  error?: string;
}

interface VoiceBody {
  text: string;
  context?: Record<string, any>;
  history?: { role: "user" | "assistant"; content: string }[];
}

// ── System prompt — lista akcji jako tekst (tańsze niż tool_use) ──

function buildSystemPrompt(): string {
  const now = new Date().toLocaleString("pl-PL", {
    timeZone: "Europe/Warsaw",
    dateStyle: "full",
    timeStyle: "short",
  });

  return `Jesteś głosowym asystentem Karola — full-stack developera z Torunia. Interpretujesz polecenia głosowe i zwracasz JSON z akcjami do wykonania.

DOSTĘPNE AKCJE:

1. trello_create_card — utwórz kartę w Trello
   params: { title: string, description?: string, listName?: string, labels?: string[] }
   Domyślna lista: "Do zrobienia". Inne opcje: "W trakcie", "Zrobione", "Pomysły"

2. trello_move_card — przenieś kartę do innej listy
   params: { cardName: string, targetList: string }

3. gmail_send — wyślij email
   params: { to: string, subject: string, body: string }

4. gmail_draft — utwórz draft emaila (bezpieczniej niż wysyłanie)
   params: { to: string, subject: string, body: string }

5. calendar_create — utwórz wydarzenie w Google Calendar
   params: { title: string, date: string (ISO 8601), duration?: number (minuty, domyślnie 60), description?: string }

6. calendar_list — pokaż nadchodzące wydarzenia
   params: { days?: number (domyślnie 7) }

7. note — zapisz notatkę
   params: { text: string, tags?: string[] }

8. reminder — ustaw przypomnienie
   params: { text: string, date: string (ISO 8601) }

ZASADY:
- ZAWSZE odpowiadaj po polsku
- Zwracaj WYŁĄCZNIE czysty JSON — bez markdown, bez backticks, bez komentarzy
- Jeśli polecenie wymaga wielu akcji, zwróć tablicę w "actions"
- Jeśli to pytanie/rozmowa bez akcji, zwróć pustą tablicę actions
- "response" — tekst do odczytania na głos, pisz naturalnie i KRÓTKO (max 2 zdania)
- Jeśli brakuje danych do wykonania akcji (np. adres email), zapytaj w "response" i ustaw "needsInput": true
- Daty relatywne ("jutro", "za godzinę", "w piątek o 14") rozwiązuj względem aktualnego czasu
- Dla gmail_send: ZAWSZE upewnij się że masz adres email. Jeśli user mówi "wyślij do Jana" bez emaila — zapytaj

AKTUALNY CZAS: ${now}

FORMAT:
{
  "thinking": "co zrozumiałem (debug)",
  "response": "tekst do TTS",
  "actions": [{ "action": "nazwa", "params": { } }],
  "needsInput": false
}`;
}

// ── Interpretacja intencji przez Claude ───────────────────────

async function interpretIntent(body: VoiceBody) {
  const messages: { role: "user" | "assistant"; content: string }[] = [];

  // Historia konwersacji (max 10 ostatnich)
  if (body.history?.length) {
    for (const msg of body.history.slice(-10)) {
      messages.push({ role: msg.role, content: msg.content });
    }
  }

  let userContent = body.text;
  if (body.context) {
    userContent += `\n\n[Kontekst: ${JSON.stringify(body.context)}]`;
  }
  messages.push({ role: "user", content: userContent });

  const response = await claude.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: buildSystemPrompt(),
    messages,
  });

  const raw = response.content[0]?.type === "text" ? response.content[0].text : "";

  try {
    const cleaned = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);
    return {
      response: parsed.response || "Nie zrozumiałem polecenia.",
      actions: (parsed.actions || []) as VoiceAction[],
      thinking: parsed.thinking || "",
      needsInput: parsed.needsInput || false,
      tokensUsed: {
        input: response.usage?.input_tokens || 0,
        output: response.usage?.output_tokens || 0,
      },
    };
  } catch {
    return {
      response: raw.slice(0, 300),
      actions: [] as VoiceAction[],
      thinking: "⚠️ Claude nie zwrócił poprawnego JSON",
      needsInput: false,
      tokensUsed: {
        input: response.usage?.input_tokens || 0,
        output: response.usage?.output_tokens || 0,
      },
    };
  }
}

// ── Executor akcji ────────────────────────────────────────────

async function executeAction(action: VoiceAction): Promise<any> {
  switch (action.action) {
    case "trello_create_card":
      return trelloCreateCard(action.params);
    case "trello_move_card":
      return trelloMoveCard(action.params);
    case "gmail_send":
      return gmailSend(action.params);
    case "gmail_draft":
      return gmailDraft(action.params);
    case "calendar_create":
      return calendarCreate(action.params);
    case "calendar_list":
      return calendarList(action.params);
    case "note":
    case "reminder":
      return saveNote(action.params);
    default:
      throw new Error(`Nieznana akcja: ${action.action}`);
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔧 Action Handlers
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Trello ────────────────────────────────────────────────────

async function trelloFetch(path: string, opts: { method?: string; params?: Record<string, string> } = {}) {
  const url = new URL(`https://api.trello.com/1${path}`);
  url.searchParams.set("key", process.env.TRELLO_API_KEY || "");
  url.searchParams.set("token", process.env.TRELLO_TOKEN || "");
  if (opts.params) {
    for (const [k, v] of Object.entries(opts.params)) url.searchParams.set(k, v);
  }
  const res = await fetch(url.toString(), { method: opts.method || "GET" });
  if (!res.ok) throw new Error(`Trello ${res.status}: ${await res.text()}`);
  return res.json();
}

async function trelloCreateCard(p: Record<string, any>) {
  // Znajdź listę po nazwie (lub użyj domyślnej)
  let listId = process.env.TRELLO_DEFAULT_LIST_ID || "";

  if (p.listName && process.env.TRELLO_DEFAULT_BOARD_ID) {
    const lists = await trelloFetch(`/boards/${process.env.TRELLO_DEFAULT_BOARD_ID}/lists`);
    const found = (lists as any[]).find((l: any) =>
      l.name.toLowerCase().includes(p.listName.toLowerCase())
    );
    if (found) listId = found.id;
  }

  if (!listId) throw new Error("Brak TRELLO_DEFAULT_LIST_ID w .env i nie znaleziono listy");

  const card = await trelloFetch("/cards", {
    method: "POST",
    params: { name: p.title, desc: p.description || "", idList: listId },
  });
  return { id: (card as any).id, name: (card as any).name, url: (card as any).shortUrl };
}

async function trelloMoveCard(p: Record<string, any>) {
  const boardId = process.env.TRELLO_DEFAULT_BOARD_ID;
  if (!boardId) throw new Error("Brak TRELLO_DEFAULT_BOARD_ID");

  const lists = await trelloFetch(`/boards/${boardId}/lists`);
  const targetList = (lists as any[]).find((l: any) =>
    l.name.toLowerCase().includes(p.targetList.toLowerCase())
  );
  if (!targetList) throw new Error(`Lista "${p.targetList}" nie znaleziona`);

  const cards = await trelloFetch(`/boards/${boardId}/cards`, { params: { fields: "name,idList" } });
  const card = (cards as any[]).find((c: any) =>
    c.name.toLowerCase().includes(p.cardName.toLowerCase())
  );
  if (!card) throw new Error(`Karta "${p.cardName}" nie znaleziona`);

  await trelloFetch(`/cards/${card.id}`, { method: "PUT", params: { idList: targetList.id } });
  return { id: card.id, movedTo: targetList.name };
}

// ── Gmail ─────────────────────────────────────────────────────

let _googleAccessToken: string | null = null;
let _googleTokenExpiry = 0;

async function getGoogleAccessToken(): Promise<string> {
  if (_googleAccessToken && Date.now() < _googleTokenExpiry - 60_000) return _googleAccessToken;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID || "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || "",
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Google OAuth: ${await res.text()}`);
  const data = (await res.json()) as { access_token: string; expires_in: number };
  _googleAccessToken = data.access_token;
  _googleTokenExpiry = Date.now() + data.expires_in * 1000;
  return _googleAccessToken;
}

function encodeEmail(to: string, subject: string, body: string): string {
  const from = process.env.GMAIL_FROM || "";
  const raw = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    body,
  ].join("\r\n");
  return Buffer.from(raw).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function gmailSend(p: Record<string, any>) {
  if (!p.to || !p.subject || !p.body) throw new Error("Brakuje to/subject/body");
  const token = await getGoogleAccessToken();
  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw: encodeEmail(p.to, p.subject, p.body) }),
  });
  if (!res.ok) throw new Error(`Gmail send: ${await res.text()}`);
  const data = (await res.json()) as { id: string };
  return { messageId: data.id, to: p.to, subject: p.subject };
}

async function gmailDraft(p: Record<string, any>) {
  if (!p.to || !p.subject || !p.body) throw new Error("Brakuje to/subject/body");
  const token = await getGoogleAccessToken();
  const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/drafts", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ message: { raw: encodeEmail(p.to, p.subject, p.body) } }),
  });
  if (!res.ok) throw new Error(`Gmail draft: ${await res.text()}`);
  const data = (await res.json()) as { id: string };
  return { draftId: data.id, to: p.to, subject: p.subject };
}

// ── Google Calendar ───────────────────────────────────────────

async function calendarCreate(p: Record<string, any>) {
  const token = await getGoogleAccessToken();
  const calId = encodeURIComponent(process.env.GCAL_CALENDAR_ID || "primary");
  const start = new Date(p.date);
  const end = new Date(start.getTime() + (p.duration || 60) * 60_000);

  const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calId}/events`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: p.title,
      description: p.description || "",
      start: { dateTime: start.toISOString(), timeZone: "Europe/Warsaw" },
      end: { dateTime: end.toISOString(), timeZone: "Europe/Warsaw" },
    }),
  });
  if (!res.ok) throw new Error(`Calendar: ${await res.text()}`);
  const ev = (await res.json()) as { id: string; summary: string; htmlLink: string; start: { dateTime: string } };
  return { id: ev.id, title: ev.summary, start: ev.start.dateTime, link: ev.htmlLink };
}

async function calendarList(p: Record<string, any>) {
  const token = await getGoogleAccessToken();
  const calId = encodeURIComponent(process.env.GCAL_CALENDAR_ID || "primary");
  const now = new Date();
  const until = new Date(now.getTime() + (p.days || 7) * 86_400_000);

  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${calId}/events`);
  url.searchParams.set("timeMin", now.toISOString());
  url.searchParams.set("timeMax", until.toISOString());
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "20");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Calendar list: ${await res.text()}`);
  const data = (await res.json()) as { items: any[] };
  return (data.items || []).map((e: any) => ({
    title: e.summary,
    start: e.start?.dateTime || e.start?.date,
    end: e.end?.dateTime || e.end?.date,
  }));
}

// ── Notes (filesystem) ───────────────────────────────────────

import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const NOTES_DIR = join(process.cwd(), "data", "voice-notes");

async function saveNote(p: Record<string, any>) {
  if (!existsSync(NOTES_DIR)) await mkdir(NOTES_DIR, { recursive: true });
  const note = {
    id: Date.now().toString(36),
    text: p.text,
    tags: p.tags || [],
    date: p.date || null,
    createdAt: new Date().toISOString(),
  };
  await writeFile(join(NOTES_DIR, `${note.id}.json`), JSON.stringify(note, null, 2));
  return { id: note.id, saved: true };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 Route Registration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default async function voiceRoutes(fastify: FastifyInstance) {

  // ── 🔒 Auth na wszystkie /api/voice/* endpointy ─────────────
  fastify.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
    // /api/voice/test nie wymaga auth (tylko sprawdza env vars)
    if (request.url === "/api/voice/test") return;
    if (!request.url.startsWith("/api/voice")) return;

    const token = process.env.VOICE_API_TOKEN;
    if (!token) {
      return reply.status(500).send({ error: "VOICE_API_TOKEN not configured on server" });
    }

    // Akceptuje: Bearer token w header LUB ?token= w query
    const authHeader = request.headers.authorization;
    const queryToken = (request.query as any)?.token;
    const provided = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7)
      : queryToken;

    if (provided !== token) {
      return reply.status(401).send({ error: "Unauthorized — bad or missing VOICE_API_TOKEN" });
    }
  });

  // ── POST /api/voice ─────────────────────────────────────────
  fastify.post("/api/voice", async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as VoiceBody;

    if (!body?.text?.trim()) {
      return reply.status(400).send({ error: "Brak tekstu", response: "Nie usłyszałem polecenia." });
    }

    try {
      const interpretation = await interpretIntent(body);

      const executedActions: VoiceAction[] = [];
      for (const action of interpretation.actions) {
        try {
          const result = await executeAction(action);
          executedActions.push({ ...action, status: "success", result });
        } catch (err: any) {
          executedActions.push({ ...action, status: "error", error: err.message });
        }
      }

      return {
        response: interpretation.response,
        actions: executedActions,
        thinking: interpretation.thinking,
        needsInput: interpretation.needsInput,
        tokensUsed: interpretation.tokensUsed,
      };
    } catch (err: any) {
      request.log.error(err);
      return reply.status(500).send({
        response: "Przepraszam, coś poszło nie tak. Spróbuj ponownie.",
        actions: [],
        error: err.message,
      });
    }
  });

  // ── GET /api/voice/actions ──────────────────────────────────
  // Debug endpoint — lista dostępnych akcji
  fastify.get("/api/voice/actions", async () => {
    return {
      actions: [
        { name: "trello_create_card", description: "Utwórz kartę w Trello" },
        { name: "trello_move_card", description: "Przenieś kartę w Trello" },
        { name: "gmail_send", description: "Wyślij email" },
        { name: "gmail_draft", description: "Utwórz draft emaila" },
        { name: "calendar_create", description: "Utwórz wydarzenie" },
        { name: "calendar_list", description: "Lista wydarzeń" },
        { name: "note", description: "Zapisz notatkę" },
        { name: "reminder", description: "Ustaw przypomnienie" },
      ],
    };
  });

  // ── GET /api/voice/test ─────────────────────────────────────
  // Quick test endpoint
  fastify.get("/api/voice/test", async () => {
    const checks: Record<string, boolean> = {
      voice_anthropic_key: !!process.env.VOICE_ANTHROPIC_API_KEY,
      voice_api_token: !!process.env.VOICE_API_TOKEN,
      trello_key: !!process.env.TRELLO_API_KEY,
      trello_token: !!process.env.TRELLO_TOKEN,
      trello_board: !!process.env.TRELLO_DEFAULT_BOARD_ID,
      trello_list: !!process.env.TRELLO_DEFAULT_LIST_ID,
      google_client: !!process.env.GOOGLE_CLIENT_ID,
      google_secret: !!process.env.GOOGLE_CLIENT_SECRET,
      google_refresh: !!process.env.GOOGLE_REFRESH_TOKEN,
      gmail_from: !!process.env.GMAIL_FROM,
    };
    return {
      status: "ok",
      configured: checks,
      missing: Object.entries(checks).filter(([, v]) => !v).map(([k]) => k),
    };
  });
}
