import { signIn } from "next-auth/react";

export default function GoogleButton({ text = "Sign up with Google" }) {
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="
        w-full flex items-center justify-center gap-2
        px-0 py-0
        border border-[#1A6A5B]
        rounded-md
        text-base font-semibold text-[#1A2A28]
        bg-white
        hover:bg-[#F5F7F6]
        transition
        h-14
        min-h-[56px]
        "
      style={{
        boxShadow: "none",
        padding: "0",
        height: "56px",
      }}
    >
      <span className="flex items-center pl-6 pr-2">
        <svg width="24" height="24" viewBox="0 0 48 48">
          <g>
            <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.5 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z"/>
            <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 5.1 29.5 3 24 3c-7.2 0-13.3 4.1-16.7 10.1z"/>
            <path fill="#FBBC05" d="M24 43c5.5 0 10.5-1.8 14.3-4.9l-6.6-5.4C29.7 34.9 27 36 24 36c-5.8 0-10.7-2.9-13.7-7.1l-7 5.4C6.7 39.1 14.1 43 24 43z"/>
            <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.2 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2l-7 5.4C17.3 41.1 20.5 43 24 43c7.2 0 13.3-4.1 16.7-10.1z"/>
          </g>
        </svg>
      </span>
      <span className="flex-1 text-center pr-6">{text}</span>
    </button>
  );
}
