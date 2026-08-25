import { Box, CssBaseline } from "@mui/material";
import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
        .then(response => setActivities(response.data))
      
      return () => {}
  }, []);
  
  return (
      <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
          <CssBaseline />
              <>
                  <NavBar />
                  <ul>
                      {activities.map((activity) => (
                          <li key={activity.id}>{activity.title}</li>
                      ))}
                  </ul>
              </>
      </Box>
  )
}

export default App
