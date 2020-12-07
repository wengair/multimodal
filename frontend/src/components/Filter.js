import React, {useState, useEffect, useContext} from 'react'
import ScatterPlot from './ScatterPlot'
import SingleListBox from './SingleListBox'
import InstanceCard from './InstanceCard'
import {Link} from 'react-router-dom'
// import {Data} from './DataContext'

function Filter({data, filteredData, setFilteredData, mode}) {
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
  ]
  
  const markOptions = [
    ['true', '-'],
    ['true', 'True'],
    ['false', 'False'],
  ]

  const objectSet = new Set()
  const objectNumSet = new Set()
  const verbSet = new Set()
// Obj Name first load
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

// Obj Number first load
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

// Action type first load
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

// Update ObjName based on the chosen ObjNum or ActionType
useEffect(() => {
  const tempObjectNameOptions = []
  // Based on ObjNumber 
  if(selectedObjNumber) {
    if(filteredData) {
      filteredData.forEach(instance => {
        if(instance.num_objects === selectedObjNumber){
          instance.object_categories.forEach(objectName => {
            objectSet.add(objectName.toLowerCase())
          })
        }
      })
      objectSet.forEach(objectName => {
        tempObjectNameOptions.push([objectName, objectName])
      })
      setObjectNameOptions(tempObjectNameOptions)
    }
  }
  // Based on ActionType 
  else if(selectedActionType){
    if(filteredData) {
      filteredData.forEach(instance => {
        instance.events.forEach(event => {
          event.verbs.forEach(verbName => {
            if(findMatchAction(verbName, instance)){
              instance.object_categories.forEach(objectName => {
                objectSet.add(objectName.toLowerCase())
              })
            }
          })
        })
      })
      objectSet.forEach(objectName => {
        tempObjectNameOptions.push([objectName, objectName])
      })
      setObjectNameOptions(tempObjectNameOptions)
    }

  }
},[filteredData],[selectedObjNumber],[selectedActionType])
objectNameOptions.sort()

// Update ObjNumber based on the chosen ActionType or ObjName
  useEffect(()=>{
    const tempObjectNumberOptions = []

    // Based on ActionType
    if(selectedActionType){
      console.log('selectedVerbs')
      if(filteredData) {
        filteredData.forEach(instance => {
          instance.events.forEach(event => {
            event.verbs.forEach(verbName => {
              if(findMatchAction(verbName, instance)){
                objectNumSet.add(instance.num_objects)
              }
            })
          })
        })
        objectNumSet.forEach(objNumber => {
          tempObjectNumberOptions.push([objNumber, objNumber])
        })
        setObjectNumberOptions(tempObjectNumberOptions)
      }
    }
     // Based on ObjName 
    else if(selectedObjName) {
      console.log('selectedObjName')
      if(filteredData) {
        filteredData.forEach(instance => {
          instance.object_categories.forEach(objectName => {
            if(objectName.includes(selectedObjName)){
              objectNumSet.add(instance.num_objects)
            }
          })
        })
        objectNumSet.forEach(objectNumber => {
          tempObjectNumberOptions.push([objectNumber, objectNumber])
        })
        setObjectNumberOptions(tempObjectNumberOptions)
      }
    }
    // // Based on ObjNumber
    // else if(selectedObjNumber) {
    //   console.log('selectedObjNumber')
    //   if(filteredData) {
    //     data.predictions.forEach(instance => {
  
    //         objectNumSet.add(instance.num_objects)
          
    //     })
    //     objectNumSet.forEach(objectNumber => {
    //       tempObjectNumberOptions.push([objectNumber, objectNumber])
    //     })
    //     setObjectNumberOptions(tempObjectNumberOptions)
    //   }
    // }
  },[filteredData],[selectedObjName],[selectedActionType])
  objectNumberOptions.sort(function(a,b){return a[0] - b[0]});

// Update ActionType based on the chosen ObjNumber or ObjName
  useEffect(() => {
    const actionTypeOptions = []
    // Based on ObjNumber 
    if(selectedObjNumber) {
      if(filteredData) {
        filteredData.forEach(instance => {
          if(instance.num_objects === selectedObjNumber){
            instance.events.forEach(event => {
              event.verbs.forEach(verbName => {
                verbSet.add(verbName.toLowerCase())
              })
            })
          }
        })
        verbSet.forEach(verbtName => {
          actionTypeOptions.push([verbtName, verbtName])
        })
        setActionTypeOptions(actionTypeOptions)
      }
    }
    // Based on ObjName
    else if(selectedObjName) {
      if(filteredData) {
        filteredData.forEach(instance => {
          instance.object_categories.forEach(objectName => {
            if(objectName.includes(selectedObjName)){
              instance.events.forEach(event => {
                event.verbs.forEach(verbName => {
                  verbSet.add(verbName.toLowerCase())
                })
              })
            }
          })
        })
        verbSet.forEach(verbtName => {
          actionTypeOptions.push([verbtName, verbtName])
        })
        setActionTypeOptions(actionTypeOptions)
      }
    }
  },[filteredData],[selectedObjNumber],[selectedObjName])
  actionTypeOptions.sort();

  //Compare ActionType
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

  useEffect(() => {
    if(data.predictions){
    //console.log('options has changed, the new result = ', selectedObjName, selectedObjNumber)
  
    const filteredData = data.predictions.filter((instance) => {
      //console.log(findMatchAction(selectedActionType,instance))
      //console.log(selectedObjNumber)
       return (selectedObjName ? instance.object_categories.includes(selectedObjName) : true) && 
              (selectedObjNumber ? (instance.num_objects === selectedObjNumber) : true) && 
              findMatchAction(selectedActionType,instance)
    })
   setFilteredData(filteredData) // pass filtered data in
    }
  },[selectedObjName, selectedObjNumber,selectedActionType])

  return (
    <div>
      <div className='filter-container'>
        <SingleListBox label='X Axis' options={[['true','-'],...xAxisOptions]} setOption={setSelectedXaxis}/>
        <SingleListBox label='Y Axis' options={[['true','-'],...yAxisOptions]} setOption={setSelectedYaxis}/>
        <SingleListBox label='Object Name' options= {[['true','-'],...objectNameOptions]} setOption={setSelectedObjName} />
        <SingleListBox label='Object Number' options= {[['true','-'],...objectNumberOptions]} setOption={setSelectedObjNumber} />
        <SingleListBox label='Action Type' options={[['true','-'],...actionTypeOptions]} setOption={setSelectedActionType} />
        {/* <SingleListBox label='Mark' options={markOptions} /> */}
        <button onClick={()=>window.location.reload()} className='reset-btn'>Reset</button>
      </div>
      <ScatterPlot data={data} selectedObjNumber={selectedObjNumber} selectedObjName={selectedObjName} selectedYaxis={selectedYaxis} selectedXaxis={selectedXaxis}/>
      <div className='content-container'>
        <div className='card-area'>
          <div className='cardss-container'>
          {filteredData && filteredData.map((instance, idx) => {
            const path = instance.img_fn.split('/')[1].split('@')[0]
            return <Link to={`/${mode}/instances/${path}`} key={idx}><InstanceCard instance={instance} /></Link>
          })}
          </div>
        </div>
      </div>
      <style jsx='true'>
        {`
        .filter-container {
          display: flex;
          justify-content: space-around;
          padding: 10px;
          border-bottom: 3px solid var(--c-strong-blue);
          align-items: center;
          margin-bottom: 15px;
        }

        .reset-btn {
          font-size: 16px;
          background: white;
          border: 1px solid;
          border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
          cursor: pointer;
        }

        .content-container {
          display: flex;
        }

        .cardss-container {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }

        .card-area {
          flex-grow: 1;
        }
        `}
      </style>
    </div>
  )
}

export default Filter
