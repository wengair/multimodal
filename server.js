const express = require('express')
const { spawn } = require('child_process')
const app = express()
const port = 8080
// Body Parser Middleware
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

// app.post('/', (req, res) => {
//   const newData = {test: "testvalue"}
//   console.log(req.body.test) 
//   // const newD = req.body.test // "testvalue"
//   let dataToSend
//   let largeDataSet = []
//   // spawn new child process to call the python script
//   // JSON.stringify(
//   const python = spawn('python', [`script3.py`, `--refs_file`, JSON.stringify(newData)])

//   // collect data from script
//   python.stdout.on('data', function (data) {
//     console.log('Pipe data from python script ...')
//     //dataToSend =  data;
//     largeDataSet.push(data)
//   })

//   // in close event we are sure that stream is from child process is closed
//   python.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`)
//     console.log({largeDataSet})
//     console.log(JSON.parse(`'${largeDataSet.join('')}'`))
//     console.log(typeof(largeDataSet.join('')))
//     // send data to browser
//     res.send(largeDataSet.join(''))
//   })
// })

const endpoints = require('./endpoints/data.js') // file name doesn't affect
app.use('/api/v1/data', endpoints)

app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})