import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    // const location = useLocation();
    return (
        <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
            <ScrollRestoration />
            <CssBaseline />
            <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
            <>
                    <NavBar />
                    <Container maxWidth='xl' sx={{ pt: 14 }}>
                        <Outlet />
                    </Container>
            </>
        </Box>
    )
}

export default App