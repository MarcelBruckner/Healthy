"use client";

import { usePathname } from "next/navigation";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Typography } from "@mui/material";


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Essen und Trinken",
    href: "/dashboard/food",
    icon: RestaurantMenuOutlinedIcon
  }, {
    name: "Toilette",
    href: "/dashboard/toilet",
    icon: WcOutlinedIcon
  },
  { name: "Infos", href: "/dashboard/infos", icon: InfoOutlinedIcon }
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <List>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return <ListItem key={link.name} disablePadding>
          <ListItemButton href={link.href} >
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText disableTypography
              primary={<Typography color={link.href === pathname ? 'primary.light' : 'primary'}>{link.name}</Typography>}>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      })}
    </List >
  );
}
