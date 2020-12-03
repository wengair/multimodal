import React, {createContext, useState, useEffect} from 'react'

export const Data = createContext(null)

function DataContext({children}) {
  const [predictions, setPredictions] = useState()
  const [groundTruths, setGroundTruths] = useState()

  const readPredictionJson = () => {
    fetch('/data/200_sample_val_conv.json')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setPredictions(result)
      })
      .catch(e => console.log(e))
  }

  const findPredictionByClip = (clip) => {
    console.log('clip', clip)
    for(const prediction of predictions){
      const predictionClip = prediction.img_fn.split('/')[1].split('@')[0]
      if(predictionClip === clip) return prediction
    }
  }
  
  const readGroundTruthJson = () => {
    fetch('/data/200_ground_val.json')
      .then(res => res.json())
      .then(result => {
        setGroundTruths(result)
      })
      .catch(e => console.log(e))
  }

  const findGroundTruthByClip = (clip) => {
    console.log('clip', clip)
    for(const groundTruth of groundTruths){
      const groundTruthClip = groundTruth.img_fn.split('/')[1].split('@')[0]
      if(groundTruthClip === clip) return groundTruth
    }
  }

  useEffect(() => {
    readPredictionJson()
    readGroundTruthJson()
  }, [])

  return (
    <Data.Provider value={{predictions, findPredictionByClip, groundTruths, findGroundTruthByClip}}>
      {children}
    </Data.Provider>
  )
}

export default DataContext
