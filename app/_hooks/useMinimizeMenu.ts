import { useEffect, useState } from "react";

export function useMinimizeMenu() {
  const [isMinimizeMenu, setIsMinimizeMenu] = useState(true);

  const onMinimiseMenu = () => setIsMinimizeMenu((cur) => !cur);

  // getting minimize option in storage
  useEffect(() => {
    const isMinimizeOptionInStorage = localStorage.getItem(
      "finance-menu-minimze"
    );

    if (isMinimizeOptionInStorage) {
      const minimizeMenuOption: boolean = JSON.parse(isMinimizeOptionInStorage);
      setIsMinimizeMenu(minimizeMenuOption);
    }
  }, []);

  // storing minimize option in storage
  useEffect(() => {
    localStorage.setItem(
      "finance-menu-minimze",
      JSON.stringify(isMinimizeMenu)
    );
  }, [isMinimizeMenu]);

  return { isMinimizeMenu, onMinimiseMenu };
}
