import { chatbotSystemInstruction } from "@/data/chatbot";
import { capabilities, experience, profile, projects } from "@/data/portfolio";

export const runtime = "nodejs";

const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";
const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_MESSAGES = 8;

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;
  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "model") &&
    typeof message.text === "string" &&
    message.text.trim().length > 0 &&
    message.text.length <= MAX_MESSAGE_LENGTH
  );
}

function localReply(text: string) {
  const normalized = text
    .toLocaleLowerCase("id-ID")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (/^(hi|hii+|hai+|halo+|hello+|hey+|p|ping)$/.test(normalized)) {
    return "Halo! Mau tahu pengalaman, keahlian, proyek, pendidikan, atau cara menghubungi Zakian?";
  }
  if (/^(makasih+|terima kasih|thank you|thanks|thx)$/.test(normalized)) {
    return "Sama-sama. Kalau masih penasaran tentang Zakian, tanya saja di sini.";
  }

  const currentRole = experience.find((item) => item.current);
  if (/kerja di mana|kerja dimana|sekarang kerja|kerja sekarang|kantor sekarang|posisi sekarang/.test(normalized)) {
    return currentRole
      ? `Saat ini Zakian bekerja sebagai ${currentRole.role} di ${currentRole.company}. ${currentRole.description}`
      : "Informasi pekerjaan Zakian saat ini belum tersedia.";
  }
  if (/pengalaman kerja|riwayat kerja|pernah kerja|pengalamannya/.test(normalized)) {
    return experience
      .map((item, index) => `${index + 1}. ${item.company}, ${item.role} (${item.period}). ${item.description}`)
      .join("\n");
  }
  if (/teknologi|skill|keahlian|kemampuan|stack|bisa apa|jago apa/.test(normalized)) {
    return capabilities
      .map((item) => `${item.title}: ${item.skills.join(", ")}.`)
      .join("\n");
  }
  if (/proyek|project|portfolio|portofolio|pernah bikin|pernah buat/.test(normalized)) {
    return projects
      .map((item, index) => `${index + 1}. ${item.name}: ${item.description} Stack: ${item.stack.join(", ")}.`)
      .join("\n");
  }
  if (/ngobrol|hubungi|kontak|email|linkedin|github|chat dimana|bicara dimana/.test(normalized)) {
    return `Paling enak hubungi Zakian lewat email ${profile.email} atau LinkedIn ${profile.linkedin}. Kode proyeknya juga ada di GitHub ${profile.github}.`;
  }
  if (/tinggal di mana|tinggal dimana|lokasi|domisili|asal mana/.test(normalized)) {
    return `Zakian berdomisili di ${profile.location}.`;
  }
  return null;
}

export async function POST(request: Request) {

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Format permintaan tidak valid." }, { status: 400 });
  }

  const messages =
    body && typeof body === "object" && Array.isArray((body as { messages?: unknown }).messages)
      ? (body as { messages: unknown[] }).messages
      : null;

  if (!messages || messages.length === 0 || !messages.every(isChatMessage)) {
    return Response.json({ error: "Pesan tidak valid." }, { status: 400 });
  }

  const latestMessage = messages.at(-1);
  if (latestMessage?.role === "user") {
    const reply = localReply(latestMessage.text);
    if (reply) return Response.json({ text: reply });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Chat belum dikonfigurasi. Tambahkan GEMINI_API_KEY di server." },
      { status: 503 },
    );
  }

  const contents = messages.slice(-MAX_HISTORY_MESSAGES).map((message) => ({
    role: message.role,
    parts: [{ text: message.text.trim() }],
  }));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: chatbotSystemInstruction }] },
          contents,
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 350,
          },
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      console.error("Gemini API error", response.status, await response.text());
      return Response.json(
        { error: "Chat sedang tidak tersedia. Coba lagi sebentar." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    if (!text) {
      return Response.json(
        { error: "Chat tidak menghasilkan jawaban. Coba pertanyaan lain." },
        { status: 502 },
      );
    }

    return Response.json({ text });
  } catch (error) {
    if (!(error instanceof Error && error.name === "AbortError")) {
      console.error("Chat request failed", error);
    }
    return Response.json(
      { error: "Chat sedang tidak tersedia. Coba lagi sebentar." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
