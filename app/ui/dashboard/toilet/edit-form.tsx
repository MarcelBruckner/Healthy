"use client";

import { FoodDB, ToiletDB } from "@/app/lib/definitions";
import { updateFood, updatePoop } from "@/app/lib/actions";
import Buttons from "../common/form-components/buttons";
import DatumUhrzeit from "../common/form-components/datum-uhrzeit";
import Errors from "../common/form-components/errors";
import { useFormState } from "react-dom";
import Stuhlverhalten from "./form-components/stuhlverhalten";
import Therapie from "./form-components/therapie";

export default function EditPoopForm({
  toilet: toilet,
}: {
  toilet: ToiletDB;
}) {
  const initialState = { message: null, errors: {} };
  const updateEntryWithId = updatePoop.bind(null, toilet.id);
  const [state, dispatch] = useFormState(updateEntryWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <DatumUhrzeit state={state} datetime={toilet.datetime} />
        <Stuhlverhalten state={state} stuhltyp={toilet.stuhltyp} stuhlverhalten={toilet.stuhlverhalten} />
        <Therapie state={state} therapie={toilet.therapie} />

        <Errors state={state} />
      </div>
      <Buttons type="toilet" submit="Eintrag bearbeiten" />
    </form>
  );
}
