import { useQuery } from "@tanstack/react-query";
import { PrayerTimesForDay } from "@/lib/types";
import { useState, useEffect } from "react";

export function usePrayerTimes() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Function to change date
  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  // Query to fetch prayer times for the current date
  const { data, isLoading, error } = useQuery<PrayerTimesForDay>({
    queryKey: ['/api/prayer-times', currentDate.toISOString().split('T')[0]],
    enabled: true,
  });

  // Countdown timer effect for next prayer
  const [countdown, setCountdown] = useState<string>("");

  useEffect(() => {
    if (!data?.nextPrayer) return;

    const timer = setInterval(() => {
      // Update countdown logic would go here in a real implementation
      // This is a simplified placeholder
      const now = new Date();
      const hours = 23 - now.getHours();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      
      setCountdown(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [data?.nextPrayer]);

  return {
    prayerTimes: data,
    countdown,
    isLoading,
    error,
    currentDate,
    nextDay: () => changeDate(1),
    previousDay: () => changeDate(-1),
  };
}
