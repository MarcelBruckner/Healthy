import { FoodDB } from "@/app/lib/definitions";
import { formatDatetime } from "@/app/lib/utils";
import { deleteFood } from "@/app/lib/actions";
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

export default async function Cards({ entries }: { entries: FoodDB[] }) {
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
                    <Typography sx={{ whiteSpace: "pre-wrap" }}>{value}</Typography>
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

                        <Line icon={PlaceOutlinedIcon} value={entry.ort} />
                        <Line icon={GroupsOutlinedIcon} value={entry.motivation} />
                        <Line icon={RestaurantOutlinedIcon} value={entry.speisen} />
                        <Line icon={WineBarOutlinedIcon} value={entry.getraenke} />
                        <Line icon={ReportProblemOutlinedIcon} value={entry.beschwerden} />
                        <Line icon={ContentPasteOutlinedIcon} value={entry.anmerkungen} />
                    </CardContent>

                    <CardActions sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "flex-start",
                    }}>
                        <EditButton id={entry.id} type="food" />
                        <CopyButton id={entry.id} type="food" />
                        <DeleteButton id={entry.id} type="food" deleteFunc={deleteFood} />
                    </CardActions>
                </Card >
            )
            }
        </>
    );
}
