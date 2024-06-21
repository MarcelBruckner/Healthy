import { Metadata } from "next";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";
import { BRISTOl_STOOL_SCALA } from "@/app/lib/utils";
import { Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, Link, List, ListItem, ListSubheader, Paper, Typography } from "@mui/material";
import { Info } from "@mui/icons-material";
import BristolStoolScala from "@/app/ui/dashboard/bristol-stool-scala";

export const metadata: Metadata = {
  title: "Infos"
};

export default function Page() {


  function ScalaEntry({ index }: { index: number }) {
    const src = `/poop-scala/typ${index + 1}.png`
    const alt = `Typ ${index}: ${BRISTOl_STOOL_SCALA[index]}`

    return < div key={alt} className="mb-4 flex flex-row" >
      <Image className="left-3 mr-3" src={src} alt={alt} width="100" height="100" />
      <div className="flex flex-row h-auto ">
        <p className="font-bold mr-4 h-full content-center">Typ {index + 1}:</p> <p className="h-full content-center">{BRISTOl_STOOL_SCALA[index]}</p>
      </div>
    </div>
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h4" fontWeight='bold' gutterBottom>
            Ernährungs-Symptom-Tagebuch
          </Typography>
          <Typography  >
            Ein Ernährungstagebuch kann Sie unterstützen, Ihren täglichen Tagesablauf und Ihre Gewohnheiten hinsichtlich der Nahrungsaufnahme zu reflektieren. Weiters kann es Ihnen helfen herauszufinden, welche Nahrungsmittel Sie besser oder weniger gut vertragen. Wenn Sie Ihr Stuhlverhalten mitdokumentieren, können Sie gegebenfalls auch einen Zusammenhang zwischen bestimmten Lebensmitteln und deren Auswirkung auf Ihren Verdauungstrakt erkennen.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5" fontWeight='bold' gutterBottom>
            Was ist wichtig bei der Führung eines Ernährungstagebuchs?
          </Typography>
          <List sx={{ listStyleType: 'disc', paddingLeft: 2 }}>
            <ListItem sx={{ display: 'list-item' }}>Notieren Sie alles, was Sie essen und trinken, auch Zwischenmahlzeiten bzw. kleine Snacks, am besten direkt nach dem Verzehr, um nichts zu vergessen.</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Je genauer, desto besser und aussagekräftiger: Beschreiben Sie alles so genau wie möglich. (Zeitpunkt der Nahrungsaufnahme, Menge, Fettgehalt der Speisen,…)</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Wenn keine Gewichtsangaben bekannt sind oder Sie das Lebensmittel nicht abwiegen können, dann schätzen Sie die Menge so gut wie möglich. (z. B. 1 Teelöffel, 1 Scheibe, 1 Handtellergroß, 1 Schöpfer,…)</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Geben Sie bei den Getränken auch die Art an. (z. B. Mineralwasser, Leitungswasser, schwarzer Tee, Fruchtsaft,…)</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Notieren Sie, wenn Beschwerden nach dem Essen oder Trinken auftreten und beschreiben Sie diese genau.</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Notieren Sie Ihre Therapie, wie Medikamente und andere Behandlungen. (z. B. Strahlentherapie)</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Notieren Sie, wenn es sonstige Besonderheiten gab. (z. B. Zeitdruck beim Essen, das Naschen beim Fernsehen,…)</ListItem>
            <ListItem sx={{ display: 'list-item' }}>Notieren Sie Ihr Stuhlverhalten. Tragen Sie die Uhrzeit, die Konsistenz, die Farbe, die Menge und sonstige Auffälligkeiten Ihres Stuhles ein.</ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h5" fontWeight='bold' gutterBottom>
            Bristol-Stuhlformen-Skala
          </Typography>
          <BristolStoolScala />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Link variant='button' target="_blank" rel="noopener" href="https://selpers.com/wp-content/uploads/2019/06/Ern%C3%A4hrungs-Symptom-Tagebuch-bei-Durchfall.pdf">
            Source: selpers.com
          </Link>
        </Paper>
      </Grid>
    </Grid>

  );
}


const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
    cols: 2,
  },
];