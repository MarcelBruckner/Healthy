"use client";

import { useFormState } from "react-dom";
import DatumUhrzeit from "../common/form-components/datum-uhrzeit";
import Buttons from "../common/form-components/buttons";
import Errors from "../common/form-components/errors";
import { ToiletDB } from "@/app/lib/definitions";
import Stuhlverhalten from "./form-components/stuhlverhalten";
import Therapie from "./form-components/therapie";
import { createPoop } from "@/app/lib/actions";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from "@mui/material";

export default function CreateToiletForm({
  toilet: toilet,
}: {
  toilet?: ToiletDB;
}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createPoop, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <LocalizationProvider dateAdapter={AdapterMoment} >
          <DatePicker label="Basic date picker" />
        </LocalizationProvider>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />


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
