import { fetchFilteredFoods } from "@/app/lib/data";
import { FoodDB } from "@/app/lib/definitions";
import { HomeIcon, CakeIcon, UserGroupIcon, BeakerIcon, ExclamationTriangleIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { formatDatetime } from "@/app/lib/utils";
import { CopyButton, DeleteButton, EditButton } from "../common/buttons";
import { deleteFood } from "@/app/lib/actions";
import DataTable from "./table-large-screen";
import { Box, Button, CardActions, Grid, Paper, SvgIconTypeMap, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import WineBarOutlinedIcon from '@mui/icons-material/WineBarOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import Cards from "./form-components/table-small-screen";

export default async function FoodsTable({
  query,
  currentPage
}: {
  query: string;
  currentPage: number;
}) {
  const entries: FoodDB[] = await fetchFilteredFoods(query);

  function Line({ icon, value }: { icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }, value: any }) {
    const Icon = icon;
    if (!value) {
      return <></>;
    }
    return <>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Icon />
        </Grid>
        <Grid item xs={11}>
          <Typography>{value}</Typography>
        </Grid>
      </Grid>
    </>
  }

  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block', height: "100%" } }}>
        <DataTable rows={entries} />
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' } }}>
        <Cards entries={entries} />
      </Box>
    </>
  );
}
