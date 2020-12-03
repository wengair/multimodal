import React, {useState, useEffect, useContext} from 'react'
import SingleListBox from './SingleListBox'
// import {Data} from './DataContext'

function Filter({data, setFilteredData}) {
  // const data = useContext(Data)
  const [objectNameOptions, setObjectNameOptions] = useState([])
  const [objectNumberOptions, setObjectNumberOptions] = useState([])
  const [actionTypeOptions, setActionTypeOptions] = useState([])
  const [selectedObjName, setSelectedObjName] = useState()
  const [selectedObjNumber, setSelectedObjNumber] = useState()
  const [selectedActionType, setSelectedActionType] = useState()
  const [selectedXasix, setSelectedXasix] = useState()
  const [selectedYasix, setSelectedYasix] = useState()
  // option format: [value for logic, string to display]

  const xAxisOptions = [
    ['bleu', 'Bleu Score'],
    ['cider', 'CIDEr Score'],
  ]

  const yAxisOptions = [
    ['cider', 'CIDEr Score'],
    ['bleu', 'Bleu Score'],
  ]
  
  const markOptions = [
    ['true', 'True'],
    ['false', 'False'],
  ]
// Obj Name
  const objectSet = new Set()
  
  useEffect(() => {
    if(data.predictions) {
      const tempObjectNameOptions = []
      data.predictions.forEach(instance => {
        instance.object_categories.forEach(objectName => {
          objectSet.add(objectName.toLowerCase())
        })
      })
      objectSet.forEach(objectName => {
        tempObjectNameOptions.push([objectName, objectName])
      })
      setObjectNameOptions(tempObjectNameOptions)
    }
  }, [data])
  objectNameOptions.sort();

//Obj Number
  const objectNumSet = new Set()
  useEffect(() => {
    if(data.predictions) {
      const tempObjectNumberOptions = []
      data.predictions.forEach(instance => {

          objectNumSet.add(instance.num_objects)
        
      })
      objectNumSet.forEach(objectNumber => {
        tempObjectNumberOptions.push([objectNumber, objectNumber])
      })
      setObjectNumberOptions(tempObjectNumberOptions)
    }
  }, [data])
  objectNumberOptions.sort(function(a,b){return a[0] - b[0]});
// Action Type
  const verbSet = new Set()
  useEffect(() => {
    if(data.predictions) {
      const actionTypeOptions = []
      data.predictions.forEach(instance => {
        instance.events.forEach(event => {
          event.verbs.forEach(verbName =>{
            verbSet.add(verbName.toLowerCase())
          })
        })
      })
      verbSet.forEach(verbtName => {
        actionTypeOptions.push([verbtName, verbtName])
      })
      setActionTypeOptions(actionTypeOptions)
    }
  }, [data])
  actionTypeOptions.sort();

  useEffect(() => {
    if(data.predictions){
    console.log('options has changed, the new result = ', selectedObjName, selectedObjNumber)
  
    const findMatchAction = (verbs, instance) => {
      if(!verbs) return true
      let found = false
      instance.events.forEach(event => {
        event.verbs.forEach(verbName =>{
         if(verbName.includes(verbs)) found = true
        })
      })
      return found
    }
    const filteredData = data.predictions.filter((instance) => {
      console.log(findMatchAction(selectedActionType,instance))
      console.log(selectedObjNumber)
       return (selectedObjName ? instance.object_categories.includes(selectedObjName) : true) && 
              (selectedObjNumber ? (instance.num_objects === selectedObjNumber) : true) && 
              findMatchAction(selectedActionType,instance)
    })
   setFilteredData(filteredData) // pass filtered data in
    }
  },[selectedObjName, selectedObjNumber,selectedActionType])
  console.log('objectNumberOptions',objectNumberOptions)
  return (
    <div>
      <div className='filter-container'>
        <SingleListBox label='X Axis' options={xAxisOptions} />
        <SingleListBox label='Y Axis' options={yAxisOptions} />
        <SingleListBox label='Object Name' options= {objectNameOptions} setOption={setSelectedObjName} />
        <SingleListBox label='Object Number' options= {objectNumberOptions} setOption={setSelectedObjNumber} />
        <SingleListBox label='Action Type' options={actionTypeOptions} setOption={setSelectedActionType} />
        <SingleListBox label='Mark' options={markOptions} />
      </div>
      <style jsx='true'>
        {`
        .filter-container {
          display: flex;
          justify-content: space-around;
          padding: 10px;
          background-color: #C4C4C4;
          width: 80vw;
          align-items: center;
        }
        `}
      </style>
    </div>
  )
}

export default Filter
