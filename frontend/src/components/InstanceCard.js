import React from 'react'

function InstanceCard({instance}) {
  const eventlist = instance.events.map(function(event,index) {
  return <h2>Event {index+1}: {event.event_name}</h2>;
})

  const baseURL = '/data/image_val_200/';
  const imgPath = baseURL + instance.img_fn
  return (
    <div className='card-container'>
      <img className= 'cardImg' src= {imgPath} alt='place holder' />

      <p className= 'eventName'>{eventlist}</p>
      <p>Scene: {instance.place}</p>
      <style jsx='true'>
        {`
        .card-container {
          width: 200px;
          height: 100%;
          padding: 5px;
          margin: 5px;
          border: 1px solid black;
        }
        .cardImg{
          width: 200px;
          height: 100px;
        }
        .eventName{
          font-size: 10px;
        }
        `}
      </style>
    </div>
  )
}

export default InstanceCard
