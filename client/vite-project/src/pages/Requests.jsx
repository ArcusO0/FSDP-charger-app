import React, {useState, useEffect} from 'react';
import http from "../http"
import { Container, Box, Grid, Card, CardContent, Typography, Drawer, Toolbar, List, Divider, 
ListItem, ListItemButton, Avatar, createTheme, ThemeProvider} from '@mui/material';
import { GridViewSharp, LibraryBooks, Settings, HelpOutline, Bolt, ArrowBackIosRounded, CreateSharp, DeleteSharp } from '@mui/icons-material';

function Requests() {
  const drawerWidth = 0;
  const theme = createTheme({
    typography: {
      fontFamily: ["Verdana", "Inter", 'Helvetica'].join(','),
    },
  });

  const [requestList, setRequestList] = useState([]);
  useEffect(() => {
    http.get('/requests').then((res) => {
      console.log(res.data);
      setRequestList(res.data);
    });
  });


  return (
    <ThemeProvider theme={theme}>
        <Box sx = {{ display: "flex" }}>
        {/* Sidebar */}
        <Drawer sx={{ 
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

        {/* Body Content */}
        <Box sx={{ml:-5, mt:5}} >
          <ArrowBackIosRounded sx={{ display: 'inline-block', mr:2}}/>
          <Typography variant="h4" sx ={{display: 'inline-block' }}>
            My Requests
          </Typography>
          <Box sx={{display: 'flex', mt: 5}} maxWidth={"100%"}>
            <Container>
              <Typography variant="h5">
                "Add" Requests
              </Typography>
              <Grid container spacing={2} sx={{mb: 5}} minWidth={500}>
                {
                  requestList.filter(x => x.type === "Add")
                  .map((request, i) => {
                    return(
                      <Grid item lg={12} key={request.id}>
                        <Card sx={{ mt: 3, border: "solid 1px black"}}>
                          <CardContent>
                            <Typography variant="h6" sx={{mb: 2}}>
                              Request ID: {request.id}
                            </Typography>
                            <Typography variant="h6" sx={{mb: 2}}>
                              EV Charger Name: {request.name}
                            </Typography>
                            <Typography variant="h6" sx={{mb: 2}}>
                              Status: {request.status}
                            </Typography>
                            <CreateSharp sx={{display: "inline-block", position: "relative", width: 30, height: 30, mx: 1, mt: -5, float:'right'}}/>
                            <DeleteSharp sx={{display: "inline-block", position: "relative", width: 30, height: 30, mx: 7, mt: -5, float:'right', color: "red"}}/>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })
                }
              </Grid>
            </Container>
            <Divider orientation='vertical' sx={{ width:2, backgroundColor: '#707070', borderRadius: "2px", mx: 5}} flexItem/>
            <Container>
              <Typography variant="h5">
                "Delete" Requests
              </Typography>
              <Grid container spacing={2} sx={{}} minWidth={500}>
                {
                  requestList.filter(x => x.type === "Delete")
                  .map((request, i) => {
                    return(
                      <Grid item lg={12} key={request.id}>
                        <Card sx={{ mt: 3, border: "solid 1px black"}}>
                          <CardContent>
                            <Typography variant="h6" sx={{mb: 2}}>
                              Request ID: {request.id}
                            </Typography>
                            <Typography variant="h6" sx={{mb: 2}}>
                              EV Charger Name: {request.name}
                            </Typography>
                            <Typography variant="h6" sx={{mb: 2}}>
                              Status: {request.status}
                            </Typography>
                            <CreateSharp sx={{display: "inline-block", position: "relative", width: 30, height: 30, mx: 1, mt: -5, float:'right'}}/>
                            <DeleteSharp sx={{display: "inline-block", position: "relative", width: 30, height: 30, mx: 7, mt: -5, float:'right', color: "red"}}/>
                          </CardContent>
                        </Card>
                      </Grid>
                    );
                  })
                }
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Requests