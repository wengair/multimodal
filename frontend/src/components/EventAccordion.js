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
                  <div className='result-container'>
                    <p className='analysis-title'>{mode === 'comparison' ? 'Ground Truth' : 'Training Data'}</p>
                    {/* Training data */}
                    <p className='analysis-sub-title'>Intent:</p>
                    <p className='analysis-sentence'> - {groundTruth.events[idx].intent}</p>
                    <p className='analysis-sub-title'>Before:</p>
                    <p className='analysis-sentence'> - {groundTruth.events[idx].before}</p>
                    <p className='analysis-sub-title'>After:</p>
                    <p className='analysis-sentence'> - {groundTruth.events[idx].after}</p>
                  </div>
                  {mode === 'comparison' &&
                  <div className='result-container'>
                    <p className='analysis-title'>Predicted</p>
                    <p className='analysis-sub-title'>Intent:</p>
                    <p className='analysis-sentence'> - {event.intent}</p>
                    <p className='analysis-sub-title'>Before:</p>
                    <p className='analysis-sentence'> - {event.before}</p>
                    <p className='analysis-sub-title'>After:</p>
                    <p className='analysis-sentence'> - {event.after}</p>
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
        flex-grow: 1;
      }

      .analysis-title {
        margin: 0px;
      }

      .analysis-sub-title {
        margin: 15px 0px 0px 0px;
      }

      .analysis-sentence {
        margin: 0px;
      }
      `}
    </style>
    </Accordion>
  )
}

export default EventAccordion
