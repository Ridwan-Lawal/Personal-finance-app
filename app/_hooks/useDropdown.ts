import { useEffect, useState } from "react";

export function useDropdown(className: string) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onOpenDropdown = () => setIsDropdownOpen((cur) => !cur);

  useEffect(() => {
    function onClickOutsideForm(e: Event | MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest(className)) {
        console.log(className);
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("click", onClickOutsideForm);

    return () => {
      document.removeEventListener("click", onClickOutsideForm);
    };
  }, [className]);

  return { isDropdownOpen, onOpenDropdown };
}
