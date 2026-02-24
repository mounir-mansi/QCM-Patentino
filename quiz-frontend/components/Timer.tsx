import { useEffect, useState, useRef } from "react";

interface TimerProps {
  startingMinutes?: number;
  startingSeconds?: number;
  onTerminated: () => void;
  questionId: string | number; // clé unique par question
}

export default function Timer({
  startingMinutes = 0,
  startingSeconds = 45,
  onTerminated,
  questionId
}: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(startingMinutes * 60 + startingSeconds);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset et démarrage du timer à chaque question
  useEffect(() => {
    // Nettoyer l'ancien intervalle si existant
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Réinitialiser le compteur
    setSecondsLeft(startingMinutes * 60 + startingSeconds);

    // Lancer l'intervalle
    intervalRef.current = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          onTerminated();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup à la destruction du composant
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [questionId, startingMinutes, startingSeconds, onTerminated]); // dépendance sur questionId !

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div>
      <p>
        Temps restant : {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs}
      </p>
    </div>
  );
}
