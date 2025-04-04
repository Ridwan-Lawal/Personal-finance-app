import { useEffect } from "react";

export function useModalBlur(
  onClose: () => void,
  className: string,
  isModalOpen: boolean,
) {
  useEffect(() => {
    if (!isModalOpen) return;

    function onBlurModal(e: Event) {
      const target = e.target as HTMLElement;
      if (!target.closest(".form-block") && !target.closest(className)) {
        onClose();
      }
    }

    window.addEventListener("click", onBlurModal);

    return () => window.removeEventListener("click", onBlurModal);
  }, [className, onClose, isModalOpen]);
}
