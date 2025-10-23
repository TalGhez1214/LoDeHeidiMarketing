export function SparkleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L13.5 8.5L12 10L10.5 8.5L12 2Z"
        fill="currentColor"
      />
      <path
        d="M2 12L8.5 10.5L10 12L8.5 13.5L2 12Z"
        fill="currentColor"
      />
      <path
        d="M12 22L10.5 15.5L12 14L13.5 15.5L12 22Z"
        fill="currentColor"
      />
      <path
        d="M22 12L15.5 13.5L14 12L15.5 10.5L22 12Z"
        fill="currentColor"
      />
    </svg>
  );
}
