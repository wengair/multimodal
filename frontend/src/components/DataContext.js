import React, {createContext, useState, useEffect} from 'react'

export const Data = createContext(null)

function DataContext({children}) {
  const [instances, setInstances] = useState()

  const readDataJson = () => {
    fetch('/data/200_sample_val_conv.json')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setInstances(result)
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    readDataJson()
  }, [])

  return (
    <Data.Provider value={{instances}}>
      {children}
    </Data.Provider>
  )
}

export default DataContext
