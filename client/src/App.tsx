import { useState, useEffect } from "react"; 
import axios from "axios";
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
        .then(response => setActivities(response.data))
      
      return () => {}
  }, []);
  
  return (
      <>
        <h3>Reactivities</h3>
        <ul>
          {activities.map((activity) => (
              <li key={activity.id}>{activity.title}</li>
          ))}
        </ul>
      </>
  )
}

export default App
