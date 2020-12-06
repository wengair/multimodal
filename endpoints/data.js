const express = require('express')
const router = express.Router()
const {spawn} = require('child_process')

// Body Parser Middleware
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.route('/getScore').all(jsonParser).post(async (req, res) => {
  try {
    const newData = req.body.instances
    let largeDataSet = []

    // spawn new child process to call the python script
    const python = spawn(
      'python3',
      [`./compute/compute_score.py`, `--gens_file`, JSON.stringify(newData)],
      {
        maxBuffer: 1024 * 1024 * 1024
      })

    // collect data from script
    python.stdout.on('data', function (data) {
      // Pipe data from python script ...
      largeDataSet.push(data)
    })

    // in close event we are sure that stream is from child process is closed
    python.on('close', (code) => {
      // parse score from the result
      const dumpString = largeDataSet.join('').split('{')
      const ans = '{' + dumpString[2].replace('\n','')
      // send data to browser
      res.send(ans)
    })
  }
  catch(e) {
    console.log(e)
  }
})

module.exports = router
