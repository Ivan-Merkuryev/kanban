"use client";

import { format } from "date-fns";

export function getDate(deadline: Date) {
  const today = new Date();

  const dedlineDay = format(deadline, "d");
  const todayDay = format(today, "d");
  const monthDedline = format(deadline, "MM");
  const monthToday = format(today, "MM");
  if (Number(monthDedline) === Number(monthToday) && Number(dedlineDay) === Number(todayDay)) {
    return <p className="text-yellow-400">Сегодня</p>;
  }
  if (
    Number(monthDedline) === Number(monthToday) &&
    Number(dedlineDay) - Number(todayDay) === 1
  ) {
    return <p className="text-yellow-200">Завтра</p>;
  }
  if (Number(monthDedline) === Number(monthToday) && Number(dedlineDay) > Number(todayDay)) {
    return <p className="text-lime-500">В этом месяце</p>;
  }
  if (Number(monthDedline) === Number(monthToday) && Number(dedlineDay) < Number(todayDay) || Number(monthToday) > Number(monthDedline)) {
    return <p className="text-red-500">Время вышло</p>;
  }
  if (Number(monthToday) < Number(monthDedline)) {
    return <p className="text-lime-500">В следующем месяце</p>;
  }
}