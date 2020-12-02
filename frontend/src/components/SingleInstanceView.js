import React from 'react'
import {Link} from 'react-router-dom'

function SingleInstanceView({instance, mode}) {
  return (
    <div className='container'>
      <div>
        <Link to={`/${mode}/instances`}>Back</Link>
        <img src='https://via.placeholder.com/800x360.png' alt='place holder'/>
        <div>
          <button>Show all label</button>
          <button>Show bounding boxes</button>
          <button>Bounding box correspond to text</button>
          <button>Show highlight in text</button>
        </div>
        <div>
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
      <div>
        <p>Mode: {mode}</p>
        <div className='misc-container'>event</div>
      </div>
      <style jsx='true'>
        {`
        .container {
          display: flex;
        }

        .misc-container {
          width: 50vw;
          height: 70vh;
          background-color: #C4C4C4;
          margin: 5px;
        }
        `}
      </style>
    </div>
  )
}

export default SingleInstanceView
