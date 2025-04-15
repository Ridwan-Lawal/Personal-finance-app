"use client";

interface errorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: errorProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 border">
      <h2 className="text-2xl font-bold">{error.message}</h2>
      <button className="btn-primary px-8 py-3" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
