export function generateMonthNameInLocale(locale: string): string[] {
  const month: string[] = [];
  const today: Date = new Date();
  for (let index = 0; index < 11; index++) {
    today.setMonth(index);
    month.push(today.toLocaleDateString(locale, { month: "long" }));
  }
  return month;
}

export function generateWeekdayNameInLocale(
  locale: string,
  options: { format: string }
): string[] {
  const weekdays: string[] = [];
  const today: Date = new Date();
  if (today.getDay() > 0) {
    today.setDate(today.getDate() - today.getDay());
  }
  for (let index = 0; index <= 6; index++) {
    weekdays.push(
      today.toLocaleDateString(locale, { weekday: options.format })
    );
    today.setDate(today.getDate() + 1);
  }
  return weekdays;
}

export function convertToMS(values: {
  minutes?: number;
  hours?: number;
  days?: number;
}): number {
  const ms: number = 1000;
  const minute: number = ms * 60;
  const hour: number = minute * 60;
  const day: number = hour * 24;
  var result = 0;
  if (values.minutes) result += values.minutes * minute;
  if (values.hours) result += values.hours * hour;
  if (values.days) result += values.days * day;
  return result;
}
