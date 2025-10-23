export function SmileIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle face */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Left eye */}
      <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
      {/* Right eye */}
      <circle cx="15.5" cy="9.5" r="1.5" fill="currentColor" />
      {/* Smile */}
      <path
        d="M7 13.5C7 13.5 9 16.5 12 16.5C15 16.5 17 13.5 17 13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
