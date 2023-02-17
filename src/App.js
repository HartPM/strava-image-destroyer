import * as React from 'react';
import './App.css';
// Components
import Auth from './Components/Auth';
import Activities from './Components/Activities';
import Athlete from './Components/Athlete';

function App() {
  const [accessToken, setAccessToken] = React.useState();
  
  // Get Access Token
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
      setAccessToken(data.access_token)
      console.log(accessToken);
    })

  return (
    <div className="App">
      <header className="App-header">
        <Auth />
        <Activities accessToken={accessToken} />
        <Athlete accessToken={accessToken} />
      </header>
    </div>
  );
}

export default App;
