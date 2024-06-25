"use client";

import { useFormState } from "react-dom";
import { createToilet } from "@/app/lib/actions";
import { ToiletDB } from "@/app/lib/definitions";
import BaseForm from "./base-form";

export default function CreateToiletForm({
  toilet
}: {
  toilet?: ToiletDB;
}) {
  const initialState = { message: null, errors: {} };

  if (toilet) {
    toilet.datetime = new Date();
  }

  const [state, dispatch] = useFormState(createToilet, initialState);
  return <BaseForm state={state} toilet={toilet} dispatch={dispatch}></BaseForm>
}
