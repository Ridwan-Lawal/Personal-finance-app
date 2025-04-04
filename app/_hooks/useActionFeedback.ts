import { useEffect } from "react";
import toast from "react-hot-toast";

export function useActionFeedback(
  state: { success: boolean; message: string } | null,
  onClose: () => void,
) {
  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.message);
        onClose();
      } else if (state?.success === false) {
        toast.error(state?.message);
      }
    }
  }, [state, onClose]);
}
