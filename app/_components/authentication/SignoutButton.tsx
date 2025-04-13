"use client";

import { LogOut } from "lucide-react";

export default function SignoutButton({
  isMinimizeMenu,
}: {
  isMinimizeMenu: boolean;
}) {
  return (
    <div className="lg:px-8 lg:py-4">
      <button className="group cursor-pointer items-center gap-4 border lg:flex">
        {!isMinimizeMenu && (
          <span className="text-preset-3 text-grey-300 group-hover:text-grey-100 hidden capitalize transition-colors lg:block">
            Sign out
          </span>
        )}
        <LogOut className="group-hover:text-grey-100 text-grey-300 size-5 transition-colors" />
      </button>
    </div>
  );
}

// sign out
// Remove borders,
// Remove console.logs
// Add skeletons
// Add metadata
