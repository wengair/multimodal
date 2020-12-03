import React, {useState, useEffect} from 'react'
import {Listbox, ListboxOption} from '@reach/listbox'
// other CSS is defined in styles/list-box.css

function SingleListBox({label, options, setOption}) {
  const [value, setValue] = useState()

  useEffect(() => {
    if(options[0]) setValue(options[0][0])
  },[options])

  console.log({options})

  const onOptionChange = (value) => {
    setValue(value)
    setOption(value)
  }
  return (
    <>
      <p className='option-label'>{label}</p>
      <Listbox value={value} onChange={(value) => onOptionChange(value)}>
        {options ? options.map((option, idx) => <ListboxOption value={option[0]} key={idx}>{option[1]}</ListboxOption>) : ''}
      </Listbox>
      <style jsx='true'>
        {`
        .option-label {
          margin: 10px 0px;
        }
        `}
      </style>
    </>
  )
}

export default SingleListBox
