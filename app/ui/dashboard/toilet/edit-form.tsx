"use client";

import { useFormState } from "react-dom";
import { updatePoop as updateToilet } from "@/app/lib/actions";
import { ToiletDB } from "@/app/lib/definitions";
import BaseForm from "./base-form";


export default function CreateToiletForm({
  toilet,
}: {
  toilet: ToiletDB;
}) {
  const initialState = { message: null, errors: {} };

  const updateEntryWithId = updateToilet.bind(null, toilet.id);
  const [state, dispatch] = useFormState(updateEntryWithId, initialState);

  return <BaseForm state={state} toilet={toilet} dispatch={dispatch}></BaseForm>
}
