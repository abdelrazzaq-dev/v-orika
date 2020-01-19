export interface ILocaleOption {
  localeCode: string;
  shortDay?: string[];
  shortMonth?: string[];
  theStartOfTheWeek?: number;
  dir?: "ltr" | "rtl";
}
