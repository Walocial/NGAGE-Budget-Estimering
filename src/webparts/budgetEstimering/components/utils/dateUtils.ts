export const Months = [
  "Januar",
  "Februar",
  "Marts",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "December",
];

export const SHORTHAND_MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec",
];

export const getCurrentYear = ():number => {
  return new Date().getFullYear();
}

export enum TimeFormat {
  Hours,
  Days,
}

// Faste datoer der aldrig skal medregnes som en arbejdsdag:
export const CONSTANT_NO_WORK_DATES = [
  { day: 1, month: 0 },   // 1. Jan   (Nytårsdag)
  { day: 24, month: 11 }, // 24. Dec  (Juleaften)
  { day: 25, month: 11 }, // 25. Dec  (Første-juledag)
  { day: 26, month: 11 }, // 26. Dec  (Anden-juledag)
  { day: 31, month: 11 }, // 31. Dec  (Nytårsaften)
];

export const getEasterSunday = (year: number): Date => {
  const goldenNumber = year % 19; // År i 19-års cyklus
  const century = Math.floor(year / 100); // Århundrede
  const yearInCentury = year % 100; // År i århundredet
  const leapYearCorrection = Math.floor(century / 4); // Tilrettelse for skudår
  const centuryRemainder = century % 4;
  const centuryAdjustment = Math.floor((century + 8) / 25); // Justering for solcyklus
  const cycleCorrection = Math.floor((century - centuryAdjustment + 1) / 3); // Tilrettelse baseret på solcyklus

  // Beregn påskesøndag
  const epact = (19 * goldenNumber + century - leapYearCorrection - cycleCorrection + 15) % 30;
  const leapYearExtra = Math.floor(yearInCentury / 4);
  const leapYearRemainder = yearInCentury % 4;
  const weekdayCorrection = (32 + 2 * centuryRemainder + 2 * leapYearExtra - epact - leapYearRemainder) % 7;
  const correctionFactor = Math.floor((goldenNumber + 11 * epact + 22 * weekdayCorrection) / 451);
  const month = Math.floor((epact + weekdayCorrection - 7 * correctionFactor + 114) / 31) - 1; // 0 = Jan, 1 = Feb, osv.
  const day = ((epact + weekdayCorrection - 7 * correctionFactor + 114) % 31) + 1;

  return new Date(year, month, day);
};

export const getDynamicNoWorkDates = (year: number): { day: number; month: number }[] => {
  const easterSunday = getEasterSunday(year);

  // Beregn relative helligdage
  const addDays = (date: Date, days: number): { day: number; month: number } => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return { day: newDate.getDate(), month: newDate.getMonth() };
  };

  const dynamicDates = [
    addDays(easterSunday, -7),  // Palmesøndag
    addDays(easterSunday, -3),  // Skærtorsdag
    addDays(easterSunday, -2),  // Langfredag
    addDays(easterSunday, 0),   // Påskedag
    addDays(easterSunday, 1),   // Anden påskedag
    addDays(easterSunday, 39),  // Kristi Himmelfartsdag
    addDays(easterSunday, 49),  // Pinsedag
    addDays(easterSunday, 50),  // Anden Pinsedag
  ];

  return [...CONSTANT_NO_WORK_DATES, ...dynamicDates];
};

