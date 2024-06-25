"use client";

import { useFormState } from "react-dom";
import { createFood } from "@/app/lib/actions";
import { FoodDB } from "@/app/lib/definitions";
import BaseForm from "./base-form";

export default function CreateFoodForm({
  food
}: {
  food?: FoodDB;
}) {
  const initialState = { message: null, errors: {} };

  if (food) {
    food.datetime = new Date();
  }

  const [state, dispatch] = useFormState(createFood, initialState);
  return <BaseForm state={state} food={food} dispatch={dispatch}></BaseForm>
}
