import * as React from 'react';
import './App.css';
import Auth from './Components/Auth';
import Activities from './Components/Activities';

function App() {
  // const [athlete, setAthlete] = React.useState({});
  const [accessToken, setAccessToken] = React.useState();
  
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

  return (
    <div className="App">
      <header className="App-header">
        <Auth />
        <button onClick={() => printAccessToken()}>Get Access Token</button>
        <Activities accessToken={accessToken} />
      </header>
    </div>
  );
}

export default App;
