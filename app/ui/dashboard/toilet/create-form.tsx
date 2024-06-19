"use client";

import { useFormState } from "react-dom";
import DatumUhrzeit from "../common/form-components/datum-uhrzeit";
import Buttons from "../common/form-components/buttons";
import Errors from "../common/form-components/errors";
import { PoopDB } from "@/app/lib/definitions";
import Stuhlverhalten from "./form-components/stuhlverhalten";
import Therapie from "./form-components/therapie";
import { createPoop } from "@/app/lib/actions";

export default function CreatePoopForm({
  toilet: toilet,
}: {
  toilet?: PoopDB;
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPoop, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <DatumUhrzeit state={state} />
        {!toilet ? <>
          <Stuhlverhalten state={state} />
          <Therapie state={state} />
        </> :
          <>
            <Stuhlverhalten state={state} stuhltyp={toilet.stuhltyp} stuhlfarbe={toilet.stuhlfarbe} />
            <Therapie state={state} therapie={toilet.therapie} />
          </>
        }

        <Errors state={state} />
      </div>
      {!toilet ?
        <Buttons type="toilet" submit="Eintrag anlegen" />
        :
        <Buttons type="toilet" submit="Eintrag kopieren" />
      }
    </form>
  );
}
