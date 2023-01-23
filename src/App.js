import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import ActivityCard from './Components/ActivityCard';

function App() {

  const [activities, setActivities] = React.useState([]);

  const getMyActivities = async () => {
      try {
        const res = await fetch('https://www.strava.com/api/v3/athlete/activities?access_token=cb5849f536ed706065a280e2aa5f1d2a2b5edaa7');
        const data = await res.json();
        setActivities(data);
      }
      catch (error) {
        alert(error)
      }
    }

 function filterPeloton() {
  let result = activities.filter(activity => (activity.trainer === true && activity.total_photo_count > 0));
  setActivities(result)
 }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href='https://www.strava.com/oauth/authorize?client_id=100352&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=read_all'>
          <button>Auth</button>
        </a>
        <button onClick={() => getMyActivities()}>Get Activities</button>
        <button onClick={() => filterPeloton()}>Peloton Filter</button>
      </header>
      <div>
        {activities.map(activity => <ActivityCard key={activity.id}activity={activity}/>)}
      </div>
    </div>
  );
}

export default App;
