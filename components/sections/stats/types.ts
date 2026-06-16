export type StatConfig = {
  value: number;
  suffix: string;
  label: string;
  /** Stagger delay before this stat enters (seconds). */
  entranceDelay: number;
  /** How long the fade/slide-in takes (seconds). */
  entranceDuration: number;
  /** How long the number counts up (seconds). */
  countDuration: number;
};
