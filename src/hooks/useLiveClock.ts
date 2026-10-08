import { useState, useEffect } from 'react';

export interface FormattedLiveClock {
  dateString: string;
  timeString: string;
  hours: string;
  minutes: string;
  seconds: string;
  ampm: string;
}

const DAYS = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const MONTHS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

function formatTwoDigits(n: number): string {
  return n.toString().padStart(2, '0');
}

export function useLiveClock(): FormattedLiveClock {
  const [clock, setClock] = useState<FormattedLiveClock>(() => formatTime(new Date()));

  function formatTime(now: Date): FormattedLiveClock {
    const dayName = DAYS[now.getDay()];
    const dateNum = formatTwoDigits(now.getDate());
    const monthName = MONTHS[now.getMonth()];
    const yearNum = now.getFullYear();

    // 12-hour format with AM/PM
    let rawHours = now.getHours();
    const ampm = rawHours >= 12 ? 'PM' : 'AM';
    rawHours = rawHours % 12;
    if (rawHours === 0) rawHours = 12;

    const hours = formatTwoDigits(rawHours);
    const minutes = formatTwoDigits(now.getMinutes());
    const seconds = formatTwoDigits(now.getSeconds());

    const dateString = `${dayName} · ${dateNum} ${monthName} ${yearNum}`;
    const timeString = `${hours} : ${minutes} : ${seconds} ${ampm}`;

    return {
      dateString,
      timeString,
      hours,
      minutes,
      seconds,
      ampm
    };
  }

  useEffect(() => {
    // Initial sync
    setClock(formatTime(new Date()));

    const intervalId = window.setInterval(() => {
      setClock(formatTime(new Date()));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return clock;
}
