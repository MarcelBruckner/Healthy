"use client";

import { FoodDB, PoopDB } from "@/app/lib/definitions";
import { updateFood, updatePoop } from "@/app/lib/actions";
import Buttons from "../common/form-components/buttons";
import DatumUhrzeit from "../common/form-components/datum-uhrzeit";
import Errors from "../common/form-components/errors";
import { useFormState } from "react-dom";
import Stuhlverhalten from "./form-components/stuhlverhalten";
import Therapie from "./form-components/therapie";

export default function EditPoopForm({
  poop: poop,
}: {
  poop: PoopDB;
}) {
  const initialState = { message: null, errors: {} };
  const updateEntryWithId = updatePoop.bind(null, poop.id);
  const [state, dispatch] = useFormState(updateEntryWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <DatumUhrzeit state={state} datetime={poop.datetime} />
        <Stuhlverhalten state={state} stuhltyp={poop.stuhltyp} stuhlverhalten={poop.stuhlverhalten} />
        <Therapie state={state} therapie={poop.therapie} />

        <Errors state={state} />
      </div>
      <Buttons type="poop" submit="Eintrag bearbeiten" />
    </form>
  );
}
