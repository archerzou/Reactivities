import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";

export default function NavBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 89%)' }}>
                <Container maxWidth='xl'>
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                                <Typography variant="h4" sx={{ position: 'relative', fontWeight: 'bold' }}>Reactivities</Typography>
                        </Box>
                        <Box sx={{ display: 'flex' }}>
                        </Box>
                    </Toolbar>
                </Container>

            </AppBar>
        </Box>
    )
}