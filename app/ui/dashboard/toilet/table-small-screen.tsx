import { ToiletDB } from "@/app/lib/definitions";
import { formatDatetime } from "@/app/lib/utils";
import { deleteFood, deleteToilet } from "@/app/lib/actions";
import { CardActions, Divider, Grid, SvgIconTypeMap, Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import WineBarOutlinedIcon from '@mui/icons-material/WineBarOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { CopyButton, DeleteButton, EditButton } from "../common/buttons";
import { ColorLensOutlined, CompressOutlined, ContentPasteOutlined, FormatListNumberedOutlined, MedicalServicesOutlined, ShowChartOutlined, WaterDropOutlined } from "@mui/icons-material";

export default async function Cards({ entries }: { entries: ToiletDB[] }) {
    function Line({ icon, value }: { icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }, value: any }) {
        const Icon = icon;
        if (!value) {
            return <></>;
        }
        return <>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Icon sx={{ color: 'action.active' }} />
                </Grid>
                <Grid item xs={11}>
                    <Typography>{value}</Typography>
                </Grid>
            </Grid>
        </>
    }

    return (
        <>
            {entries.map((entry, index) =>
                <Card key={entry.id} sx={{ marginBottom: "0.5rem", display: { xs: 'block', sm: 'block', md: 'block', lg: 'none', xl: 'none' } }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {formatDatetime(entry.datetime)}
                        </Typography>
                        <Divider sx={{ marginY: 1 }} />
                        <Line icon={WaterDropOutlined} value={entry.urinmenge} />
                        <Line icon={CompressOutlined} value={entry.urindruck} />
                        <Line icon={FormatListNumberedOutlined} value={`Typ ${entry.stuhltyp}`} />
                        <Line icon={ColorLensOutlined} value={entry.stuhlfarbe} />
                        <Line icon={ShowChartOutlined} value={entry.stuhlmenge} />
                        <Line icon={CompressOutlined} value={entry.stuhldruck} />
                        <Line icon={MedicalServicesOutlined} value={entry.therapie} />
                        <Line icon={ContentPasteOutlined} value={entry.anmerkungen} />
                    </CardContent>

                    <CardActions sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                    }}>
                        <EditButton id={entry.id} type="toilet" />
                        <CopyButton id={entry.id} type="toilet" />
                        <DeleteButton id={entry.id} type="toilet" deleteFunc={deleteToilet} />
                    </CardActions>
                </Card >
            )
            }
        </>
    );
}
