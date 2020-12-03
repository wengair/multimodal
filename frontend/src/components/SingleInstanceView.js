import React, {useState, useEffect, useContext} from 'react'
import EventAccordion from './EventAccordion'
import {Link, useParams} from 'react-router-dom'
import {Data} from './DataContext'
import Boundingbox from 'react-bounding-box'

function SingleInstanceView({mode}) {
  const data = useContext(Data)
  const {id} = useParams()
  const [instance, setInstance] = useState()
  const [boundingBoxs, setBoundingBoxs] = useState()
  const [showingBoxes, setShowingBoxes] = useState([])
  const [scores, setScores] = useState()
  const baseUrl = '/data/image_val_200/'
  const allBoxes = {}

  // change according to event, only show number if can't
  useEffect(() => {
    if(data) setInstance(data.findPredictionByClip(id))
  }, [data])

  useEffect(() => {
    if(instance) getBoundingBox(instance.metadata_fn)
  }, [instance])

  const getBoundingBox = (jsonPath) => {
    fetch(baseUrl + jsonPath)
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setBoundingBoxs(result)
        const tempBoxes = {}
        const record = {}
        for(let i = 0; i < result.boxes.length; i++) {
          // record[]
        }
      })
      .catch(e => console.log(e))
  }

  const params = {
    image: baseUrl + instance?.img_fn,
    // image: 'http://i.imgur.com/gF7QYwa.jpg',
    boxes: boundingBoxs?.boxes,
    // boxes: [
    //   // coord(0,0) = top left corner of image
    //   //[x, y, width, height]
    //   // [0, 0, 250, 250],
    //   // [300, 0, 250, 250],
    //   // [700, 0, 300, 25],
    //   // [1100, 0, 25, 300]
    //   {coord: [0, 0, 250, 250], label: "test"},
    //   {coord: [300, 0, 250, 250], label: "A"},
    //   {coord: [700, 0, 300, 25], label: "B"},
    //   {coord: [1100, 0, 25, 300], label: "C"}
    // ],
    options: {
      colors: {
        normal: 'rgba(255,225,255,1)',
        selected: 'rgba(0,225,204,1)',
        unselected: 'rgba(100,100,100,1)'
      },
      style: {
        maxWidth: '100%',
        maxHeight: '90vh'
      }
      //showLabels: false
    }
  }
  
  return (
    <div className='container'>
      {instance &&
        <>
        {console.log(instance)}
          <div>
            <Link to={`/${mode}/instances`}>Back</Link>
            <div className='image-container'>
              <img src={baseUrl + instance.img_fn} alt='place holder' className='instance-img' />
            </div>
            <Boundingbox
              image={params.image}
              boxes={params.boxes}
              options={params.options}
            />
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
            <div className='misc-container'>
              <EventAccordion instance={instance} />
            </div>
          </div>
        </>}
      <style jsx='true'>
        {`
        .container {
          display: flex;
        }

        .image-container {
          width: 50vw;
        }

        .instance-img {
          width: 100%;
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
