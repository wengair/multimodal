import React, {createContext, useState, useEffect} from 'react'

export const Data = createContext(null)

function DataContext({children}) {
  const [predictions, setPredictions] = useState()

  const readDataJson = () => {
    fetch('/data/200_sample_val_conv.json')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setPredictions(result)
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    readDataJson()
  }, [])

  return (
    <Data.Provider value={{predictions}}>
      {children}
    </Data.Provider>
  )
}

export default DataContext
