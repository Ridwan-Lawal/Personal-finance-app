"use client";

import React from "react";

interface errorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: errorProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <h2 className="text-2xl font-bold">{error.message}</h2>
      <button className="" onClick={reset}>
        Reset
      </button>
    </div>
  );
}
