import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from "@reach/accordion";
import "@reach/accordion/styles.css"

function EventAccordion({instance, groundTruth, mode}) {

  return (
    <Accordion>
      {instance &&
        instance.events.map((event, idx) => {
          return (
            <AccordionItem>
                <AccordionButton>Event{idx + 1}: {event.event_name}</AccordionButton>
              <AccordionPanel>
                <div>
                  <p>Scene: {instance.place}</p>
                  <p>Object count: {instance.num_objects}</p>
                  <p>Object name: {instance.object_categories.join(', ')}</p>
                  <p>Action type: {event.verbs.join(', ')}</p>
                </div>
                <div className='analysis-container'>
                  <div className='result-container ground-truth'>
                    <p>{mode === 'comparison' ? 'Ground Truth' : 'Training Data'}</p> 
                    {/* Training data */}
                    <p>Intent:</p>
                    {groundTruth.events[idx].intent}
                    <p>Before:</p>
                    {groundTruth.events[idx].before}
                    <p>After:</p>
                    {groundTruth.events[idx].after}
                  </div>
                  {mode === 'comparison' &&
                  <div className='result-container'>
                    <p>Predicted</p>
                    <p>Intent:</p>
                    {event.intent}
                    <p>Before:</p>
                    {event.before}
                    <p>After:</p>
                    {event.after}
                  </div>}
                </div>
              </AccordionPanel>
            </AccordionItem>
          )
        })
      }
    <style jsx='true'>
      {`
      .container {
        display: flex;
      }

      .image-container {
        width: 50vw;
      }

      .instance-img {
        width: 100%;
      }

      .analysis-container {
        display: flex;  
      }

      .result-container {
        border: 2px solid black;
        margin: 5px;
        padding: 10px;
        width: 50%;
      }

      .misc-container {
        width: 50vw;
        height: 70vh;
        background-color: #C4C4C4;
        margin: 5px;
      }
      `}
    </style>
    </Accordion>
  )
}

export default EventAccordion
