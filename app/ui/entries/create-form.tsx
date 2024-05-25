"use client";

import { createEntry as createEntry } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import DatumUhrzeit from "./form-components/datum-uhrzeit";
import Ort from "./form-components/ort";
import Motivation from "./form-components/motivation";
import Speisen from "./form-components/speisen";
import Getraenke from "./form-components/getraenke";
import Beschwerden from "./form-components/beschwerden";
import Stuhlverhalten from "./form-components/stuhlverhalten";
import Therapie from "./form-components/therapie";
import Anmerkungen from "./form-components/anmerkungen";
import Buttons from "./form-components/buttons";
import Errors from "./form-components/errors";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createEntry, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <DatumUhrzeit state={state} />
        <Ort state={state} />
        <Motivation state={state} />
        <Speisen state={state} />
        <Getraenke state={state} />
        <Beschwerden state={state} />
        <Stuhlverhalten state={state} />
        <Therapie state={state} />
        <Anmerkungen state={state} />

        <Errors state={state} />
      </div>
      <Buttons submit="Eintrag anlegen" />
    </form>
  );
}
