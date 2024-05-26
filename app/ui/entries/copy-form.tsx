"use client";

import { Entry } from "@/app/lib/definitions";
import { copyEntry, updateEntry } from "@/app/lib/actions";
import Anmerkungen from "./form-components/anmerkungen";
import Beschwerden from "./form-components/beschwerden";
import Buttons from "./form-components/buttons";
import DatumUhrzeit from "./form-components/datum-uhrzeit";
import Errors from "./form-components/errors";
import Getraenke from "./form-components/getraenke";
import Motivation from "./form-components/motivation";
import Ort from "./form-components/ort";
import Speisen from "./form-components/speisen";
import Stuhlverhalten from "./form-components/stuhlverhalten";
import Therapie from "./form-components/therapie";
import { useFormState } from "react-dom";

export default function CopyInvoiceForm({
  entry,
}: {
  entry: Entry;
}) {
  const initialState = { message: null, errors: {} };
  const copyEntryWithId = copyEntry.bind(null, entry.id);
  const [state, dispatch] = useFormState(copyEntryWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <DatumUhrzeit state={state} />
        <Ort state={state} ort={entry.ort} />
        <Motivation state={state} motivation={entry.motivation} />
        <Speisen state={state} speisen={entry.speisen} />
        <Getraenke state={state} getraenke={entry.getraenke} />
        <Beschwerden state={state} beschwerden={entry.beschwerden} />
        <Stuhlverhalten state={state} stuhltyp={entry.stuhltyp} stuhlverhalten={entry.stuhlverhalten} />
        <Therapie state={state} therapie={entry.therapie} />
        <Anmerkungen state={state} anmerkungen={entry.anmerkungen} />

        <Errors state={state} />
      </div>
      <Buttons submit="Eintrag kopieren" />
    </form>
  );
}
