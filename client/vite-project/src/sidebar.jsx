import {Box, Drawer, Toolbar, Avatar, List, ListItem, ListItemButton} from "@mui/material";
import {GridViewSharp, LibraryBooks, Bolt, Settings, HelpOutline} from "@mui/icons-material";

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
                    <Avatar alt="Logo" src="/static/images/avatar/"/>  
                </Toolbar> 
                <List>
                    <ListItem sx={{ color: "#137AE1" }}>
                        <ListItemButton>
                        <GridViewSharp/>
                        </ListItemButton>
                    </ListItem> 
                    <ListItem sx={{ color: "#137AE1" }}>
                        <ListItemButton>
                        <LibraryBooks/>
                        </ListItemButton>
                    </ListItem> 
                    <ListItem sx={{ color: "#137AE1" }}>
                        <ListItemButton>
                        <Bolt/>
                        </ListItemButton>
                    </ListItem> 
                    <ListItem sx={{ color: "#137AE1" }}>
                        <ListItemButton>
                        <Settings/>
                        </ListItemButton>
                    </ListItem> 
                    <ListItem sx={{ color: "#137AE1" }}>
                        <ListItemButton>
                        <HelpOutline/>
                        </ListItemButton>
                    </ListItem> 
                </List>
                <Avatar alt="Profile" src="/static/images/avatar" sx={{alignSelf:"center", marginTop: "320%"}} anchor="bottom"/>
            </Drawer>
        </Box>
    )
}

export default Sidebar;
