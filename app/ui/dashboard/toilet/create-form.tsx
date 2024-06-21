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
import { BRISTOl_STOOL_SCALA } from "@/app/lib/utils";
import ColorLensOutlined from "@mui/icons-material/ColorLensOutlined";
import FormatListNumberedOutlined from "@mui/icons-material/FormatListNumberedOutlined";
import CompressOutlined from "@mui/icons-material/CompressOutlined";
import WaterDropOutlined from "@mui/icons-material/WaterDropOutlined";
import { ContentPasteOutlined, MedicalServicesOutlined, ShowChartOutlined } from "@mui/icons-material/";
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
