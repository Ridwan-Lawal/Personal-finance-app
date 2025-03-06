import { useState } from "react";

export function useShowPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => setShowPassword((cur) => !cur);

  return { showPassword, onShowPassword };
}
