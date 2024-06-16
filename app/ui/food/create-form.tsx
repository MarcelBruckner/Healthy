"use client";

import { useFormState } from "react-dom";
import DatumUhrzeit from "./form-components/datum-uhrzeit";
import Ort from "./form-components/ort";
import Motivation from "./form-components/motivation";
import Speisen from "./form-components/speisen";
import Getraenke from "./form-components/getraenke";
import Beschwerden from "./form-components/beschwerden";
import Buttons from "./form-components/buttons";
import Errors from "./form-components/errors";
import { createFood } from "@/app/lib/actions";
import { FoodDB } from "@/app/lib/definitions";

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
        </> :
          <>
            <Ort state={state} ort={food.ort} />
            <Motivation state={state} motivation={food.motivation} />
            <Speisen state={state} speisen={food.speisen} />
            <Getraenke state={state} getraenke={food.getraenke} />
            <Beschwerden state={state} beschwerden={food.beschwerden} />
          </>
        }

        <Errors state={state} />
      </div>
      {!food ?
        <Buttons submit="Eintrag anlegen" />
        :
        <Buttons submit="Eintrag kopieren" />
      }
    </form>
  );
}
