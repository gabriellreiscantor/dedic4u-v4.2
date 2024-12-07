import React, { useState, useEffect, useCallback } from 'react';
import { differenceInMilliseconds } from 'date-fns';

interface RelationshipTimerProps {
  startDate: string;
}

interface TimeUnits {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const RelationshipTimer: React.FC<RelationshipTimerProps> = ({ startDate }) => {
  const [time, setTime] = useState<TimeUnits>({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  const calculateTime = useCallback(() => {
    const start = new Date(startDate);
    const now = new Date();
    const diff = differenceInMilliseconds(now, start);

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 365);
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

    setTime({ years, days, hours, minutes, seconds });
  }, [startDate]);

  useEffect(() => {
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  return (
    <div className="bg-pink-500/10 rounded-lg p-4 backdrop-blur-sm">
      <h3 className="text-lg font-semibold text-pink-500 mb-4 text-center">Tempo Juntos</h3>
      <div className="grid grid-cols-5 gap-4 text-center">
        <TimeUnit value={time.years} label="Anos" />
        <TimeUnit value={time.days} label="Dias" />
        <TimeUnit value={time.hours} label="Horas" />
        <TimeUnit value={time.minutes} label="Min" />
        <TimeUnit value={time.seconds} label="Seg" />
      </div>
    </div>
  );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <span className="text-xl font-bold text-white">{value}</span>
    <span className="text-xs text-pink-500">{label}</span>
  </div>
);