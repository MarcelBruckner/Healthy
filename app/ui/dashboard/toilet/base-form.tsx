"use client";

import { useFormState } from "react-dom";
import Errors from "../common/errors";
import { StateToilet, createToilet, updatePoop as updateToilet } from "@/app/lib/actions";
import { ToiletDB } from "@/app/lib/definitions";
import { Button, Card, CardActions, CardContent, Grid } from "@mui/material";
import moment from "moment";
import { useRouter } from 'next/navigation'  // Usage: App router
import BasicFormControl from "../common/form-control";
import DateFormControl from "../common/date-form-control";
import TimeFormControl from "../common/time-form-control";
import SelectFormControl from "../common/select-form-control";
import { BRISTOl_STOOL_SCALA, NIEDRIG_NORMAL_HOCH, STUHLFARBEN, WENIG_NORMAL_VIEL } from "@/app/lib/utils";
import ColorLensOutlined from "@mui/icons-material/ColorLensOutlined";
import FormatListNumberedOutlined from "@mui/icons-material/FormatListNumberedOutlined";
import CompressOutlined from "@mui/icons-material/CompressOutlined";
import WaterDropOutlined from "@mui/icons-material/WaterDropOutlined";
import { ContentPasteOutlined, MedicalServicesOutlined, ShowChartOutlined, WaterOutlined } from "@mui/icons-material/";

export default function BaseForm({ toilet, state, dispatch }: { toilet?: ToiletDB, state: StateToilet, dispatch: any }) {
  const router = useRouter()
  return <form action={dispatch}>
    <Card key={toilet?.id} >
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <DateFormControl id="datum" value={moment(toilet?.datetime).format("YYYY-MM-DD")} label="Datum" errors={state.errors?.datum} />
          </Grid >
          <Grid item xs={12}>
            <TimeFormControl id="uhrzeit" value={moment(toilet?.datetime).format("HH:mm")} label="Uhrzeit" errors={state.errors?.uhrzeit} />
          </Grid >
          <Grid item xs={12}>
            <SelectFormControl icon={WaterDropOutlined} id="urinmenge" label="Urinmenge" value={toilet?.urinmenge} values={WENIG_NORMAL_VIEL} errors={state.errors?.urinmenge} />
          </Grid >
          <Grid item xs={12}>
            <SelectFormControl icon={WaterOutlined} id="urindruck" label="Urindruck" value={toilet?.urindruck} values={NIEDRIG_NORMAL_HOCH} errors={state.errors?.urindruck} />
          </Grid >
          <Grid item xs={12}>
            <SelectFormControl icon={FormatListNumberedOutlined} id="stuhltyp" label="Stuhltyp" value={toilet?.stuhltyp} values={BRISTOl_STOOL_SCALA.map((s, i) => i == 0 ? "" : `Typ ${i}: ${s}`)} errors={state.errors?.stuhltyp} />
          </Grid >
          <Grid item xs={12}>
            <SelectFormControl icon={ColorLensOutlined} id="stuhlfarbe" label="Stuhlfarbe" value={toilet?.stuhlfarbe} values={STUHLFARBEN} errors={state.errors?.stuhlfarbe} />
          </Grid >
          <Grid item xs={12}>
            <SelectFormControl icon={ShowChartOutlined} id="stuhlmenge" label="Stuhlmenge" value={toilet?.stuhlmenge} values={WENIG_NORMAL_VIEL} errors={state.errors?.stuhlmenge} />
          </Grid >
          <Grid item xs={12}>
            <SelectFormControl icon={CompressOutlined} id="stuhldruck" label="Stuhldruck" value={toilet?.urindruck} values={NIEDRIG_NORMAL_HOCH} errors={state.errors?.stuhldruck} />
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
