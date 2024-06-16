"use client";

import { FoodDB } from "@/app/lib/definitions";
import { updateFood } from "@/app/lib/actions";
import Beschwerden from "./form-components/beschwerden";
import Buttons from "../common/form-components/buttons";
import DatumUhrzeit from "../common/form-components/datum-uhrzeit";
import Errors from "../common/form-components/errors";
import Getraenke from "./form-components/getraenke";
import Motivation from "./form-components/motivation";
import Ort from "./form-components/ort";
import Speisen from "./form-components/speisen";
import { useFormState } from "react-dom";
import Anmerkungen from "./form-components/anmerkungen";

export default function EditFoodForm({
  food,
}: {
  food: FoodDB;
}) {
  const initialState = { message: null, errors: {} };
  const updateEntryWithId = updateFood.bind(null, food.id);
  const [state, dispatch] = useFormState(updateEntryWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <DatumUhrzeit state={state} datetime={food.datetime} />
        <Ort state={state} ort={food.ort} />
        <Motivation state={state} motivation={food.motivation} />
        <Speisen state={state} speisen={food.speisen} />
        <Getraenke state={state} getraenke={food.getraenke} />
        <Beschwerden state={state} beschwerden={food.beschwerden} />
        <Anmerkungen state={state} anmerkungen={food.anmerkungen} />

        <Errors state={state} />
      </div>
      <Buttons type="food" submit="Eintrag bearbeiten" />
    </form>
  );
}
