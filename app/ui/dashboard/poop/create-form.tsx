"use client";

import { useFormState } from "react-dom";
import DatumUhrzeit from "../common/form-components/datum-uhrzeit";
import Buttons from "../common/form-components/buttons";
import Errors from "../common/form-components/errors";
import { createFood, createPoop } from "@/app/lib/actions";
import { PoopDB } from "@/app/lib/definitions";
import Stuhlverhalten from "./form-components/stuhlverhalten";
import Therapie from "./form-components/therapie";

export default function CreatePoopForm({
  poop: poop,
}: {
  poop?: PoopDB;
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPoop, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <DatumUhrzeit state={state} />
        {!poop ? <>
          <Stuhlverhalten state={state} />
          <Therapie state={state} />
        </> :
          <>
            <Stuhlverhalten state={state} stuhltyp={poop.stuhltyp} stuhlverhalten={poop.stuhlverhalten} />
            <Therapie state={state} therapie={poop.therapie} />
          </>
        }

        <Errors state={state} />
      </div>
      {!poop ?
        <Buttons type="poop" submit="Eintrag anlegen" />
        :
        <Buttons type="poop" submit="Eintrag kopieren" />
      }
    </form>
  );
}
