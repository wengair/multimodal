import React, {useState, useEffect, useContext} from 'react'
import ScatterPlot from './ScatterPlot'
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
  const [selectedXaxis, setSelectedXaxis] = useState()
  const [selectedYaxis, setSelectedYaxis] = useState()
  // option format: [value for logic, string to display]

  const yAxisOptions = [
    ['Bleu_1', 'Bleu Score'],
    ['Cider', 'CIDEr Score'],
  ]

  const xAxisOptions = [
    ['num of objects', 'Num of Objects'],
    ['name of object', 'Name of Objects'],
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
    // use data with filter function 
    // const findMatchAction(verbs, instance){
    // data.predictions.filter((instance) => {})
    // }
    const filteredData = data.predictions.filter((instance) => {
       return instance.object_categories.includes(selectedObjName) && instance.num_objects === selectedObjNumber 
      //return instance.events.verbs.includes(selectedActionType)
    })
    setFilteredData(filteredData) // pass filtered data in
    }
  },[selectedObjName, selectedObjNumber,selectedActionType])
  return (
    <div>
      <div className='filter-container'>
        <SingleListBox label='X Axis' options={xAxisOptions} setOption={setSelectedXaxis}/>
        <SingleListBox label='Y Axis' options={yAxisOptions} setOption={setSelectedYaxis}/>
        <SingleListBox label='Object Name' options= {objectNameOptions} setOption={setSelectedObjName} />
        <SingleListBox label='Object Number' options= {objectNumberOptions} setOption={setSelectedObjNumber} />
        <SingleListBox label='Action Type' options={actionTypeOptions} setOption={setSelectedActionType} />
        <SingleListBox label='Mark' options={markOptions} />
      </div>
      <ScatterPlot data={data} selectedObjNumber={selectedObjNumber} selectedObjName={selectedObjName} selectedYaxis={selectedYaxis} selectedXaxis={selectedXaxis}/>
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
