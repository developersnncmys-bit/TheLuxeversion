"use client";

// Replace with the house's WhatsApp number in international format, no plus.
const WHATSAPP_NUMBER = "911234567890";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}`;

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      // Sits on the right rail, one slot above the ambient-audio toggle so the
      // two never overlap. Solid black bubble, white glyph — legible on both
      // dark ink pages and the light footer strip.
      className="fixed bottom-44 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-[0_6px_20px_rgba(0,0,0,0.25)] md:bottom-48 md:right-10"
    >
      <WhatsAppGlyph />
    </a>
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.11 4.9A9.82 9.82 0 0 0 12.06 2C6.6 2 2.17 6.42 2.17 11.87a9.8 9.8 0 0 0 1.32 4.93L2.1 22l5.35-1.4a9.9 9.9 0 0 0 4.61 1.17h.01c5.45 0 9.88-4.42 9.88-9.87a9.8 9.8 0 0 0-2.84-6.99Zm-7.05 15.19h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.17.83.85-3.09-.2-.32a8.16 8.16 0 0 1-1.25-4.32c0-4.53 3.69-8.21 8.22-8.21 2.2 0 4.26.86 5.81 2.4a8.16 8.16 0 0 1 2.41 5.81c0 4.53-3.69 8.22-8.22 8.22Zm4.51-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.83-.2-.48-.4-.42-.56-.42h-.48c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.03s.87 2.35 1 2.51c.12.16 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.46-.6 1.67-1.17.21-.58.21-1.07.14-1.17-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
