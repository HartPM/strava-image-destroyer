import * as React from 'react';
import logo from './logo.svg';
import './App.css';
// import ActivityCard from './Components/ActivityCard';

function App() {
  const [accessToken, setAccessToken] = React.useState();
  // const [athlete, setAthlete] = React.useState({});

  // Get/Renew Access Token
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
    setAccessToken(r)
    console.log(accessToken)
  }

  // console.log(process.env.REACT_APP_CLIENT_ID)
  // console.log(process.env.REACT_APP_CLIENT_SECRET)
  // console.log(process.env.REACT_APP_REFRESH_TOKEN)



  // Get Athlete
  // const athleteObj = fetch('https://www.strava.com/api/v3/athlete', {
  //   method: 'get',
  //   'headers': {
  //     'Authorization': `Bearer ${accessToken}`
  //   }
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))

  // const printAthleteObj = async () => {
  //   const r = await athleteObj
  //   // console.log(r)
  //   setAthlete(r)
  // }

  // printAthleteObj()
  
  



  const [activities, setActivities] = React.useState([]);

  const getMyActivities = async () => {
      try {
        const res = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`);
        const data = await res.json();
        setActivities(data);
        console.log(activities)
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
        <a href='https://www.strava.com/oauth/authorize?client_id=100352&redirect_uri=http://localhost:3000/&response_type=code&scope=activity:read_all,activity:write'>
          <button>Auth</button>
        </a>
        <button onClick={() => printAccessToken()}>Get Access Token</button>
        <button onClick={() => getMyActivities()}>Get Activities</button>
        <button onClick={() => filterPeloton()}>Peloton Filter</button>
      </header>
      <div>
        {/* {activities.map(activity => <ActivityCard key={activity.id} activity={activity}/>)} */}
      </div>
    </div>
  );
}

export default App;
