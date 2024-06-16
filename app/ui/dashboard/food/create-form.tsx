"use client";

import { useFormState } from "react-dom";
import DatumUhrzeit from "../common/form-components/datum-uhrzeit";
import Ort from "./form-components/ort";
import Motivation from "./form-components/motivation";
import Speisen from "./form-components/speisen";
import Getraenke from "./form-components/getraenke";
import Beschwerden from "./form-components/beschwerden";
import Buttons from "../common/form-components/buttons";
import Errors from "../common/form-components/errors";
import { createFood } from "@/app/lib/actions";
import { FoodDB } from "@/app/lib/definitions";
import Anmerkungen from "./form-components/anmerkungen";

export default function CreateFoodForm({
  food,
}: {
  food?: FoodDB;
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createFood, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <DatumUhrzeit state={state} />
        {!food ? <>
          <Ort state={state} />
          <Motivation state={state} />
          <Speisen state={state} />
          <Getraenke state={state} />
          <Beschwerden state={state} />
          <Anmerkungen state={state} />
        </> :
          <>
            <Ort state={state} ort={food.ort} />
            <Motivation state={state} motivation={food.motivation} />
            <Speisen state={state} speisen={food.speisen} />
            <Getraenke state={state} getraenke={food.getraenke} />
            <Beschwerden state={state} beschwerden={food.beschwerden} />
            <Anmerkungen state={state} anmerkungen={food.anmerkungen} />
          </>
        }

        <Errors state={state} />
      </div>
      {!food ?
        <Buttons type="food" submit="Eintrag anlegen" />
        :
        <Buttons type="food" submit="Eintrag kopieren" />
      }
    </form>
  );
}
