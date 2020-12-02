import React, {useState, useEffect, useContext} from 'react'
import SingleListBox from './SingleListBox'
import {Data} from './DataContext'

function Filter() {
  const data = useContext(Data)
  const [objectNameOptions, setObjectNameOptions] = useState([])
  // option format: [value for logic, string to display]

  const xAxisOptions = [
    ['bleu', 'Bleu Score'],
    ['cider', 'CIDEr Score'],
  ]

  const yAxisOptions = [
    ['cider', 'CIDEr Score'],
    ['bleu', 'Bleu Score'],
  ]

  // /*const sceneOptions = [
  //   ['indoor', 'Indoor'],
  //   ['outdoor', 'Outdoor'],
  //   ['kitchen', 'Kitchen'],
  // ]*/

  // const objectNameOptions = [
  //   ['human', 'Human'],
  //   ['cat', 'Cat'],
  //   ['dog', 'Dog'],
  // ]

  const ActionTypeOptions = [
    ['verb1', 'Verb1'],
    ['verb2', 'Verb2'],
    ['verb3', 'Verb3'],
  ]
  
  const markOptions = [
    ['true', 'True'],
    ['false', 'False'],
  ]

  //var allObj=[];
  //const objtest = [data.map(event=>allObj.push(event.object_categories))]
  const objectSet = new Set()
  
  useEffect(() => {
    if(data.instances) {
      const tempObjectNameOptions = []
      data.instances.forEach(item => {
        item.object_categories.forEach(objectName => {
          objectSet.add(objectName.toLowerCase())
        })
      })
      objectSet.forEach(objectName => {
        tempObjectNameOptions.push([objectName, objectName])
      })
      setObjectNameOptions(tempObjectNameOptions)
    }
  }, [data])

  return (
    <div>
      <div className='filter-container'>
        <SingleListBox label='Object Name' options= {objectNameOptions}/>
        <SingleListBox label='Action Type' options={ActionTypeOptions} />
        <SingleListBox label='Mark' options={markOptions} />
        <SingleListBox label='X Axis' options={xAxisOptions} />
        <SingleListBox label='Y Axis' options={yAxisOptions} />
      </div>
      <style jsx='true'>
        {`
        .filter-container {
          display: flex;
          justify-content: space-around;
          padding: 10px;
          background-color: #C4C4C4;
          width: 80vw;
        }
        `}
      </style>
    </div>
  )
}

export default Filter
