import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import ActivityCard from './Components/ActivityCard';

function App() {
  // const [accessToken, setAccessToken] = React.useState({});

  const authorizationResponse = fetch('https://www.strava.com/oauth/token', {
      method: 'post',
      'headers': {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      })
    })
    .then(response => response.json())
    .then(data => {
      return data.access_token;
    })

  const printAccessToken = async () => {
    const r = await authorizationResponse
    console.log(r)
  }

  printAccessToken()
  
  



  const [activities, setActivities] = React.useState([]);

  const getMyActivities = async () => {
      try {
        console.log(process.env.STRAVA_ACCESS_TOKEN)
        const res = await fetch(`https://www.strava.com/api/v3/athlete/activities?${process.env.STRAVA_ACCESS_TOKEN}`);
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
        {activities.map(activity => <ActivityCard key={activity.id} activity={activity}/>)}
      </div>
    </div>
  );
}

export default App;
