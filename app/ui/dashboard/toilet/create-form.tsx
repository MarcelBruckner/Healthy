"use client";

import { useFormState } from "react-dom";
import Errors from "../common/form-components/errors";
import { StateToilet, createToilet, updatePoop as updateToilet } from "@/app/lib/actions";
import { ToiletDB } from "@/app/lib/definitions";
import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import moment from "moment";
import { useRouter } from 'next/navigation'  // Usage: App router
import BasicFormControl from "../common/form-control";
import DateFormControl from "../common/date-form-control";
import TimeFormControl from "../common/time-form-control";
import SelectFormControl from "../common/select-form-control";
import { BRISTOl_STOOL_SCALA } from "@/app/lib/utils";
import ColorLensOutlined from "@mui/icons-material/ColorLensOutlined";
import FormatListNumberedOutlined from "@mui/icons-material/FormatListNumberedOutlined";
import CompressOutlined from "@mui/icons-material/CompressOutlined";
import WaterDropOutlined from "@mui/icons-material/WaterDropOutlined";
import { ContentPasteOutlined, MedicalServicesOutlined, ShowChartOutlined } from "@mui/icons-material/";

const VIEL_NORMAL_WENIG = ["Wenig", "Normal", "Viel"];
const NIEDRIG_NORMAL_HOCH = ["Niedrig", "Normal", "Hoch"];
const TOILET_COLORS = ["Braun", "Gelb", "Lehmfarben", "Schwarz", "Grün", "Rot"];
const DEFAULT_NORMAL = "Normal";

export default function CreateToiletForm({
  toilet,
  copy
}: {
  toilet?: ToiletDB;
  copy?: boolean
}) {
  const router = useRouter()

  const initialState = { message: null, errors: {} };

  function wrapWithEmpty(values: any[], back?: boolean) {
    if (back) {
      return [...values, ""];
    }
    return ["", ...values];
  }

  function Lines({ toilet, state, dispatch }: { toilet?: ToiletDB, state: StateToilet, dispatch: any }) {
    return <form action={dispatch}>
      <Card key={toilet?.id} >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DateFormControl id="datum" value={moment(toilet?.datetime).format("YYYY-MM-DD")} label="Datum" errors={state.errors?.datum} />
            </Grid >
            <Grid item xs={12}>
              <TimeFormControl id="uhrzeit" value={moment(toilet?.datetime).format("HH:mm:ss")} label="Uhrzeit" errors={state.errors?.uhrzeit} />
            </Grid >
            <Grid item xs={12}>
              <SelectFormControl icon={WaterDropOutlined} id="urinmenge" label="Urinmenge" value={toilet?.urinmenge} values={wrapWithEmpty(VIEL_NORMAL_WENIG)} errors={state.errors?.urinmenge} />
            </Grid >
            <Grid item xs={12}>
              <SelectFormControl icon={CompressOutlined} id="urindruck" label="Urindruck" value={toilet?.urindruck} values={wrapWithEmpty(NIEDRIG_NORMAL_HOCH)} errors={state.errors?.urindruck} />
            </Grid >
            <Grid item xs={12}>
              <SelectFormControl icon={FormatListNumberedOutlined} id="stuhltyp" label="Stuhltyp" value={toilet?.stuhltyp} values={wrapWithEmpty(BRISTOl_STOOL_SCALA).map((s, i) => i == 0 ? "" : `Typ ${i}: ${s}`)} errors={state.errors?.stuhltyp} />
            </Grid >
            <Grid item xs={12}>
              <SelectFormControl icon={ColorLensOutlined} id="stuhlfarbe" label="Stuhlfarbe" value={toilet?.stuhlfarbe} values={wrapWithEmpty(TOILET_COLORS)} errors={state.errors?.stuhlfarbe} />
            </Grid >
            <Grid item xs={12}>
              <SelectFormControl icon={ShowChartOutlined} id="stuhlmenge" label="Stuhlmenge" value={toilet?.stuhlmenge} values={wrapWithEmpty(VIEL_NORMAL_WENIG)} errors={state.errors?.stuhlmenge} />
            </Grid >
            <Grid item xs={12}>
              <SelectFormControl icon={CompressOutlined} id="stuhldruck" label="Stuhldruck" value={toilet?.urindruck} values={wrapWithEmpty(NIEDRIG_NORMAL_HOCH)} errors={state.errors?.stuhldruck} />
            </Grid >
            <Grid item xs={12}>
              <BasicFormControl icon={MedicalServicesOutlined} id="therapie" label="Therapie" value={toilet?.therapie} errors={state.errors?.therapie} />
            </Grid >
            <Grid item xs={12}>
              <BasicFormControl icon={ContentPasteOutlined} id="anmerkungen" label="Anmerkungen" value={toilet?.anmerkungen} errors={state.errors?.anmerkungen} />
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

  if (!toilet || copy) {
    const [state, dispatch] = useFormState(createToilet, initialState);
    return <Lines state={state} toilet={toilet} dispatch={dispatch}></Lines>
  }

  const updateEntryWithId = updateToilet.bind(null, toilet.id);
  const [state, dispatch] = useFormState(updateEntryWithId, initialState);

  return <Lines state={state} toilet={toilet} dispatch={dispatch}></Lines>
}
