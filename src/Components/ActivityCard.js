import * as React from 'react';

function ActivityCard ({ activity, accessToken }) {

    const handleDeleteImage = async () => {
        try {
          const res = await fetch(`https://www.strava.com/api/v3/activities/${activity.id}`, {
            method: 'post',
            'headers': {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              'body': JSON.stringify({
                // Add updated activity object



                
              })
          });
          const data = await res.json();
          console.log(data);
        }
        catch (error) {
          alert(error)
        }
      }

    return (
        <div>
            <h3>{activity.name}</h3>
            <p>{activity.total_photo_count}</p>
            <button onClick={handleDeleteImage}>delete images</button>
        </div>
    )
}

export default ActivityCard;