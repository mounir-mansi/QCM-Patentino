import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const INACTIVITY_LIMIT = 30 * 60 * 1000;

export default function useAutoLogout() {
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout | null>(null);

const logout = useCallback(async () => {
  await fetch("/api/users/logout", { method: "POST" });
  localStorage.removeItem("user");
  localStorage.removeItem("email");
  localStorage.removeItem("firstname");
  localStorage.removeItem("lastname");
  localStorage.removeItem("questions");
  localStorage.removeItem("usedQuestions");
  localStorage.removeItem("currentScore");
  localStorage.setItem("logoutMessage", "Vous avez été déconnecté pour inactivité.");
  window.location.href = "/logIn";
}, []);

  const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(logout, INACTIVITY_LIMIT);
  }, [logout]);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) return;

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, resetTimer));
    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timer.current) clearTimeout(timer.current);
    };
  }, [resetTimer]);
}