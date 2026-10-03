// Sağ altta sabit WhatsApp düğmesi. Numara: 0544 624 75 14 (uluslararası biçim 90 544 624 75 14).
const PHONE = "905446247514";
const MESSAGE = "Merhaba, AOM web sitesinden ulaşıyorum.";

export default function WhatsAppButton() {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;
  return (
    <a href={href} className="wa-button" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yazın: 0544 624 75 14">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.5-4.3A8.5 8.5 0 1 1 20.5 11.6Z" />
        <path d="M9.1 8.2c.3-.6.7-.6 1-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.7l-.5.6c-.1.2-.1.4 0 .6.6 1.1 1.5 2 2.6 2.6.2.1.4.1.6 0l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3 0 .7-.6 1-.6.4-1.6.5-2.9-.1a10 10 0 0 1-4.5-4.5c-.6-1.3-.5-2.3-.1-2.9Z" fill="currentColor" stroke="none" />
      </svg>
      <span className="wa-label">WhatsApp</span>
    </a>
  );
}
