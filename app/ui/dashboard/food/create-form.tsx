"use client";

import { useFormState } from "react-dom";
import Errors from "../common/form-components/errors";
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

export default function CreateFoodForm({
  food,
  copy
}: {
  food?: FoodDB;
  copy?: boolean
}) {
  const router = useRouter()

  const initialState = { message: null, errors: {} };

  function Lines({ food, state, dispatch }: { food?: FoodDB, state: StateFood, dispatch: any }) {
    return <form action={dispatch}>
      <Card key={food?.id} >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DateFormControl id="datum" value={moment(food?.datetime).format("YYYY-MM-DD")} label="Datum" errors={state.errors?.datum} />
            </Grid >
            <Grid item xs={12}>
              <TimeFormControl id="uhrzeit" value={moment(food?.datetime).format("HH:mm:ss")} label="Uhrzeit" errors={state.errors?.uhrzeit} />
            </Grid >
            <Grid item xs={12}>
              <BasicFormControl icon={PlaceOutlinedIcon} id="ort" label="Ort" value={food?.ort} errors={state.errors?.ort} />
            </Grid >
            <Grid item xs={12}>
              <BasicFormControl icon={GroupsOutlinedIcon} id="motivation" label="Motivation" value={food?.motivation} errors={state.errors?.motivation} />
            </Grid >
            <Grid item xs={12}>
              <BasicFormControl icon={RestaurantOutlinedIcon} id="speisen" label="Speisen" value={food?.speisen} errors={state.errors?.speisen} />
            </Grid >
            <Grid item xs={12}>
              <BasicFormControl icon={WineBarOutlinedIcon} id="getraenke" label="Getränke" value={food?.getraenke} errors={state.errors?.getraenke} />
            </Grid >
            <Grid item xs={12}>
              <BasicFormControl icon={ReportProblemOutlinedIcon} id="beschwerden" label="Beschwerden" value={food?.beschwerden} errors={state.errors?.beschwerden} />
            </Grid >
            <Grid item xs={12}>
              <BasicFormControl icon={ContentPasteOutlinedIcon} id="anmerkungen" label="Anmerkungen" value={food?.anmerkungen} errors={state.errors?.anmerkungen} />
            </Grid >
            <Grid item xs={12}>
              <Errors state={state} />
            </Grid >
          </Grid>
        </CardContent>
        <CardActions sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        }}>
          <Button variant="outlined" onClick={() => router.back()}>Abbrechen</Button>
          <Button type="submit" variant="contained">Speichern</Button>
        </CardActions>
      </Card >
    </form>
  }

  if (!food) {
    const [state, dispatch] = useFormState(createFood, initialState);
    return <Lines state={state} dispatch={dispatch}></Lines>
  }

  if (copy) {
    const [state, dispatch] = useFormState(createFood, initialState);
    return <Lines state={state} food={food} dispatch={dispatch}></Lines>
  }

  const updateEntryWithId = updateFood.bind(null, food.id);
  const [state, dispatch] = useFormState(updateEntryWithId, initialState);

  return <Lines state={state} food={food} dispatch={dispatch}></Lines>
}
