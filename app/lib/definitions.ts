export type Food = {
  datetime: Date;
  ort: string;
  motivation: string;
  speisen: string;
  getraenke: string;
  beschwerden: string;
  anmerkungen: string;
};

export type FoodDB = Food & { id: string };

export type Toilet = {
  datetime: Date;
  urinmenge: number;
  urindruck: number;
  stuhltyp: number;
  stuhlfarbe: number;
  stuhlmenge: number;
  stuhldruck: number;
  therapie: string;
  anmerkungen: string;
};

export type ToiletDB = Toilet & { id: string };
