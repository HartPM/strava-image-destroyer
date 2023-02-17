import * as React from 'react';
import ActivityCard from './ActivityCard';

function Activities({accessToken}) {
    const [activities, setActivities] = React.useState([]);

    const getMyActivities = async () => {
        try {
          const res = await fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`);
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
        <>
            <button onClick={() => getMyActivities()}>Get Activities</button>
            <button onClick={() => filterPeloton()}>Peloton Filter</button>
            <div>
                {activities.map(activity => <ActivityCard key={activity.id} activity={activity} accessToken={accessToken} />)}
            </div>
        </>
    )
}

export default Activities;