import React from 'react';
import {Box, Drawer, Toolbar, Avatar, List, ListItem, ListItemButton, Link} from "@mui/material";
import {GridViewSharp, LibraryBooks, Bolt, Settings, HelpOutline, Send} from "@mui/icons-material";

function Sidebar() {
    const drawerWidth = 0;
    return(
        <Box>
            <Drawer sx={{ 
                overflow: "hidden",
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-Paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    {/*Website Logo */}
                    <Avatar alt="Logo" src="/src/assets/logo.jpg" />  
                </Toolbar> 
                <List sx={{maxHeight: "80%"}}>
                    <ListItem sx={{ color: "#137AE1" }}>
                        <Link href={'/'}>
                            <ListItemButton>
                                <GridViewSharp/>
                            </ListItemButton>
                        </Link>
                    </ListItem> 
                    <ListItem sx={{ color: "#137AE1" }}>
                        <Link href={'/MyBookings'}>
                            <ListItemButton>
                                <LibraryBooks/>
                            </ListItemButton>
                        </Link>
                    </ListItem> 
                    <ListItem sx={{ color: "#137AE1" }}>
                        <Link href={"/MyEVC/"}> 
                            <ListItemButton>
                                <Bolt/>
                            </ListItemButton>
                        </Link>                        
                    </ListItem> 
                    <ListItem sx={{ color: "#137AE1" }}>
                        <Link href={"/MyRequests"}>
                            <ListItemButton>
                                <Send sx={{display: "flex", position: "relative", left: 4, transform:"rotate(-45deg)"}}/>
                            </ListItemButton>
                        </Link>
                    </ListItem> 
                    <ListItem sx={{ color: "#137AE1" }}>
                        <Link>
                            <ListItemButton>
                                <Settings/>
                            </ListItemButton>
                        </Link>
                    </ListItem> 
                    <ListItem sx={{ color: "#137AE1" }}>
                        <Link>
                            <ListItemButton>
                                <HelpOutline/>
                            </ListItemButton>
                        </Link>
                    </ListItem> 
                </List>
                <Avatar alt="Profile" src="/static/images/avatar" sx={{position: "relative", alignSelf:"center", top: "30%"}} anchor="bottom"/>
            </Drawer>
        </Box>
    )
}

export default Sidebar;
