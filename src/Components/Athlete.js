import * as React from 'react';

function Athlete ({ accessToken }) {
const [athlete, setAthlete] = React.useState({});
//   Get Athlete
  const athleteObj = fetch('https://www.strava.com/api/v3/athlete', {
    method: 'get',
    'headers': {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))

  const printAthleteObj = async () => {
    const r = await athleteObj
    // console.log(r)
    setAthlete(r)
  }

  printAthleteObj()


  return (
    <button>Athlete</button>
  )
}

export default Athlete;