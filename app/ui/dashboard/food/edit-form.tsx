"use client";

import { useFormState } from "react-dom";
import Errors from "../common/errors";
import { StateFood, createFood, updateFood } from "@/app/lib/actions";
import { FoodDB } from "@/app/lib/definitions";
import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import moment from "moment";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import WineBarOutlinedIcon from '@mui/icons-material/WineBarOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { useRouter } from 'next/navigation'  // Usage: App router
import BasicFormControl from "../common/form-control";
import DateFormControl from "../common/date-form-control";
import TimeFormControl from "../common/time-form-control";
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
