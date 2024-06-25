"use client";

import { useFormState } from "react-dom";
import { updateFood } from "@/app/lib/actions";
import { FoodDB } from "@/app/lib/definitions";
import BaseForm from "./base-form";

export default function EditFoodForm({
  food,
}: {
  food: FoodDB;
}) {
  const initialState = { message: null, errors: {} };

  const updateEntryWithId = updateFood.bind(null, food.id);
  const [state, dispatch] = useFormState(updateEntryWithId, initialState);

  return <BaseForm state={state} food={food} dispatch={dispatch}></BaseForm>
}
