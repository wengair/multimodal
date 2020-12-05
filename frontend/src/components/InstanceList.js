import React, {useState, useEffect, useContext} from 'react'
import Filter from './Filter'
//import ScatterPlot from './ScatterPlot'
import InstanceCard from './InstanceCard'
import {Link} from 'react-router-dom'
// import data from '../data/200_sample_val_conv.json'
import {Data} from './DataContext'

function InstanceList({mode}) {
  // const requireImages = require.context('../data/image_val_100/', true, /\.jpg$/)
  // const allImgpaths = requireImages.keys().map(path => ({path, file: requireImages(path)}))
  const data = useContext(Data)
  const [filteredData, setFilteredData] = useState()

  useEffect(() => {
    console.log(data)
    if(data.predictions) setFilteredData(data.predictions)
  },[data])
  console.log(filteredData)
  return (
    <div className='instance-list-container'>
      <Filter data={data} setFilteredData={setFilteredData} />
      <div className='cards-container'>
        {filteredData && filteredData.map((instance, idx) => <Link to={`/${mode}/instances/${idx}`} key={idx}><InstanceCard instance={instance} /></Link>)}
      </div>
      <style jsx='true'>
        {`
        .instance-list-container {
          padding: 30px;
        }

        .cards-container {
          display: flex;
          width: 50%;
          flex-wrap: wrap;
        }
        `}
      </style>
      
    </div>
    
  )
}

export default InstanceList
