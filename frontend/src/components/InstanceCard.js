import React from 'react'

function InstanceCard({instance}) {
  const eventlist = instance.events.map(function(event,index) {
  return <p key={index}><b>Event {index + 1}:</b> {event.event_name}</p>;
})

  const baseURL = '/data/image_val_200/';
  const imgPath = baseURL + instance.img_fn
  return (
    <div className='card-container'>
      <img className= 'card-img' src= {imgPath} alt='place holder' />
      <div className='card-text'>
        <p><b>Scene:</b> {instance.place}</p>
        {eventlist}
      </div>
      <style jsx='true'>
        {`
        .card-container {
          width: 230px;
          height: 96.5%;
          margin: 5px;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          transition: 0.3s;
        }

        .card-container:hover {
          box-shadow: 0 8px 16px 0 rgba(0,0,0,0.3);
          transform: scale(1.02);
        }

        .card-img{
          width: 100%;
        }

        .card-text {
          padding: 5px;
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
