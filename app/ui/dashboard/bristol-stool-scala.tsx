import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { BRISTOl_STOOL_SCALA } from '@/app/lib/utils';
import Image from "next/image";
import { Link } from '@mui/material';

export default function BristolStoolScala() {
    return (
        <>
            <List sx={{ width: '100%' }}>
                {BRISTOl_STOOL_SCALA.map((type, index) => {
                    if (index === 0) {
                        return <></>;
                    }
                    const src = `/poop-scala/typ${index}.png`
                    const alt = `Typ ${index}: ${type}`

                    return <>
                        <ListItem sx={{ alignItems: 'center', height: '100' }}                    >
                            <ListItemAvatar>
                                <Image src={src} alt={alt} width="153" height="100" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`Typ ${index}`}
                                secondary={
                                    <Typography
                                        sx={{ display: 'block' }}
                                        component="span"
                                        variant="body1"
                                        color="text.primary"
                                    >
                                        {type}
                                    </Typography>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </>
                })}
            </List>
        </>
    );
}
