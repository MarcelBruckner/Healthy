import { fetchCardData } from "@/app/lib/data";
import { ContentPasteOutlined, CoronavirusOutlined, RestaurantMenuOutlined, WcOutlined } from "@mui/icons-material";
import { Card as MUICard, CardHeader, Avatar, IconButton, CardContent, Typography, CardActions, Grid } from "@mui/material";
import { red } from "@mui/material/colors";

const iconMap = {
  entries: ContentPasteOutlined,
  foods: RestaurantMenuOutlined,
  illness: CoronavirusOutlined,
  toilets: WcOutlined
};

export default async function CardWrapper() {
  const {
    totalNumberOfEntries,
    numberOfFoods,
    numberOfDrinks,
    numberOfPoops
  } = await fetchCardData();

  return (
    <Grid container spacing={4} justifyContent="center">
      <Card title="Einträge" value={totalNumberOfEntries} type="entries" />
      <Card title="Essen" value={numberOfFoods} type="foods" />
      <Card
        title="Stuhlgänge"
        value={numberOfPoops}
        type="toilets"
      />
      <Card title="Erkrankungen" value={numberOfDrinks} type="illness" />
    </Grid>
  );
}

export function Card({
  title,
  value,
  type
}: {
  title: string;
  value: number | string;
  type: "entries" | "foods" | "illness" | "toilets";
}) {
  const Icon = iconMap[type];

  return (
    <Grid item container direction="column" sm={6} md={6} lg={3} spacing={2}>
      <Grid item>
        <MUICard >
          <CardHeader
            avatar={
              <Icon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            }
            action={
              <IconButton aria-label="settings">
              </IconButton>
            }
            title={title}
          // subheader="September 14, 2016"
          />
          <CardContent>
            <Typography variant="h4" color="text.secondary" align="center">
              {value}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          </CardActions>
        </MUICard>
      </Grid>
    </Grid>
  );
}
