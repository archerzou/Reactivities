import Group from "@mui/icons-material/Group";
import { Box, AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { NavLink } from "react-router";

export default function NavBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            <Button component={NavLink} to='/' color="inherit" sx={{ display: 'flex', gap: 2 }}>
                                <Group fontSize='large' />
                                <Typography variant="h4" sx={{ position: 'relative', fontWeight: 'bold' }}>Reactivities</Typography>
                            </Button>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                            <Button component={NavLink} to='/activities' color="inherit" sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Activities
                            </Button>
                            <Button color="inherit" sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                About
                            </Button>
                            <Button color="inherit" sx={{ fontSize: '1.2rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                Contact
                            </Button>
                        </Box>
                        <Button size="large" variant="contained" color="warning">Create Activity</Button>
                    </Toolbar>
                </Container>

            </AppBar>
        </Box>
    )
}
