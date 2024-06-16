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

export type Poop = {
  datetime: Date;
  stuhltyp: number;
  stuhlverhalten: string;
  therapie: string;
};

export type PoopDB = Poop & { id: string };
