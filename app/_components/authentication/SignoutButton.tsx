"use client";

import { signOutAction } from "@/app/_lib/actions/authActions";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export default function SignoutButton({
  isMinimizeMenu,
}: {
  isMinimizeMenu: boolean;
}) {
  const [state, formAction, isSigningOut] = useActionState(signOutAction, null);
  const router = useRouter();

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.message);
      }

      if (state?.success === false) {
        toast.error(state?.message);
      }
    }
  }, [state, router]);

  return (
    <div className="lg:px-8 lg:py-4">
      <form action={formAction}>
        <button
          disabled={isSigningOut}
          aria-disabled={isSigningOut}
          className="group cursor-pointer items-center gap-4 lg:flex"
        >
          {!isMinimizeMenu && (
            <span className="text-preset-3 text-grey-300 group-hover:text-grey-100 hidden capitalize transition-colors lg:block">
              {isSigningOut ? "Signing out..." : "  Sign out"}
            </span>
          )}
          {isSigningOut ? (
            <span className="text-white">...</span>
          ) : (
            <LogOut className="group-hover:text-grey-100 text-grey-300 size-5 transition-colors" />
          )}
        </button>
      </form>
    </div>
  );
}

// Add skeletons
// Add metadata
