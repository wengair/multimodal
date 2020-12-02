import React, {createContext, useState, useEffect} from 'react'

export const AnnotatedData = createContext(null)

function DataContext({children}) {
  const [annotatedData, setAnnotatedData] = useState()

  const readDataJson = () => {
    fetch('/data/val_annots.json')
      .then(res => res.json())
      .then(result => {
        console.log(result)
        setAnnotatedData(result)
      })
      .catch(e => console.log(e))
  }

  const testPython = () => {
    fetch('/data/test.py', {
      method: 'POST',
      mode: 'cors',
      body: {
        "--refs_file": 'test',
        "--gens_file": 'ttest',
      },
    })
      // .then(res => res.json())
      .then(result => {
        console.log(result)
      })
      .catch(e => console.log(e))
    // $.ajax({
    //   type: "POST",
    //   url: "~/data/test.py",
    //   data: { param: text}
    //   }).done(function(o) {
    //       console.log(data);
    //       console.log(text);
    //   });
  }
  
  
  useEffect(() => {
    // readDataJson()
    testPython()
  }, [])

  return (
    <AnnotatedData.Provider value={{annotatedData}}>
      {children}
    </AnnotatedData.Provider>
  )
}

export default DataContext
