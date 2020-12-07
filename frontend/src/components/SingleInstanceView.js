import React, {useState, useEffect, useContext, useRef} from 'react'
import EventAccordion from './EventAccordion'
import {Link, useParams} from 'react-router-dom'
import {Data} from './DataContext'
import Boundingbox from './ReactBoundingBox'

// func note: change according to event, only show number if can't
function SingleInstanceView({mode}) {
  const data = useContext(Data)
  const {id} = useParams()
  const [instance, setInstance] = useState()
  const [groundTruth, setGroundTruth] = useState()
  const [showedBoxes, setShowedBoxes] = useState([])
  const baseUrl = '/data/image_val_200/'
  const [allBoxes, setAllboxes] = useState()

  const boundingboxOptions = {
    colors: {
      normal: 'rgba(255,225,255,1)',
      selected: 'rgba(0,225,204,1)',
      unselected: 'rgba(100,100,100,1)'
    },
    style: { // CSS
      maxWidth: '100%',
      maxHeight: '100vh',
    }
    //showLabels: false
  }

  useEffect(() => {
    if(data) {
      setInstance(data.findPredictionByClip(id))
      setGroundTruth(data.findGroundTruthByClip(id))
    }
  }, [data])

  useEffect(() => {
    if(instance) {
      getBoundingBox(instance.metadata_fn)
    }
  }, [instance])

  const getBoundingBox = (jsonPath) => {
    fetch(baseUrl + jsonPath)
      .then(res => res.json())
      .then(result => {
        const tempAllBoxes = {}
        // const tempShowedBox = []
        const record = {}
        for(let i = 0; i < result.boxes.length; i++) {
          record[result.names[i]] = record[result.names[i]] ? record[result.names[i]] + 1 : 1
          // set for allBoxes
          tempAllBoxes[`${result.names[i]}${record[result.names[i]]}`] = {
            title: `${result.names[i]} ${record[result.names[i]]}`,
            boxes: {
              coord: result.boxes[i],
              label: `${result.names[i]}${record[result.names[i]]}`,
            },
            segms: result.segms[i],
          }
          // set for showedBox
          // tempShowedBox.push(tempAllBoxes[`${result.names[i]}${record[result.names[i]]}`].boxes)
        }
        setAllboxes(tempAllBoxes) //object 
        setShowedBoxes([]) //{coord: [0, 0, 250, 250], label: "test"},
      })
      .catch(e => console.log(e))
  }
  
  const updateShowBoxes = (objectData) => {
    const tempBox = showedBoxes.map(x => { return {...x} })
    const boxIdx = containBox(tempBox, objectData.boxes)
    if(boxIdx !== false) tempBox.splice(boxIdx, 1)
    else tempBox.push(objectData.boxes)
    setShowedBoxes(tempBox)
  }

  const containBox = (originalArray, element) => {
    for(const [idx, originalElement] of originalArray.entries()) {
      if(originalElement.label === element.label) return idx
    }
    return false
  }
  
  const showAllBoxes = () => {
    const tempBox = Object.entries(allBoxes).map(objectData => objectData[1].boxes)
    setShowedBoxes(tempBox)
  }

  const hideAllBoxes = () => {
    setShowedBoxes([])
  }
  
  return (
    <div className='single-content-container'>
      <div className='nav'>
        <div className='nav-item'><Link to={`/${mode}/instances`}>← Back</Link></div>
        <div><p>Mode: {mode}</p></div>
      </div>
      {showedBoxes && instance &&
        <div className='content-container'>
          <div className='left-content'>
            <div className='image-container'>
              <img src={baseUrl + instance.img_fn} alt='place holder' className='instance-img' />
              <div className='canvas-container'>
              <Boundingbox
                image={baseUrl + instance.img_fn} // baseUrl + instance.img_fn
                boxes={showedBoxes} // shoow
                options={boundingboxOptions} // fix
                // pixelSegmentation={params.segmentation}
              />
              </div>
            </div>
            <div className='img-btn-container'>
              <button onClick={showAllBoxes} className='image-btn'>Show all label</button>
              <button onClick={hideAllBoxes} className='image-btn'>Hide all label</button><br />
              {/* <button>Bounding box correspond to text</button>
              <button>Show highlight in text</button> */}
              {allBoxes && Object.entries(allBoxes).map(objectData => {
                return <button onClick={() => updateShowBoxes(objectData[1])} className='image-btn'>{objectData[0]}</button>
              })}
            </div>
            {/* <div>
              <button>Previous</button>
              <button>Next</button>
            </div> */}
          </div>
          <div className='right-content'>
            <EventAccordion instance={instance} groundTruth={groundTruth} mode={mode}/>
          </div>
        </div>}
      <style jsx='true'>
        {`
        .single-content-container {
          padding:0px 30px;
        }
        .nav {
          display: flex;
          height: 70px;
          align-items: center;
        }

        .nav-item {
          width: 51%;
        }

        .content-container {
          display: flex;
        }

        .left-content{
          width: 50%;
        }

        .image-container {
          width: 100%;
        }

        .instance-img {
          width: 100%;
        }

        .canvas-container {
          position: absolute;
          max-width: 47.73%;
          top: 70px;
        }

        .img-btn-container {
          margin: 0px -5px;
        }

        .image-btn {
          margin: 5px;
          padding: 5px;
          background: white;
          border: 1px solid black;
          border-radius: 5px;
          cursor: pointer;
        }

        .right-content {
          width: 48%;
          margin: 0px 10px;
        }
        `}
      </style>
    </div>
  )
}

export default SingleInstanceView
