import React, {useEffect, useState} from 'react'
//import * as d3 from 'd3'
import ScatterPlotDraw from './ScatterPlotDraw'

function ScatterPlot({data, selectedObjNumber, selectedObjName, selectedYaxis, selectedXaxis}) {
    const [filteredGroups, setFilteredGroups] = useState([])

    useEffect(() => {
        if (data.predictions) {
            if (selectedXaxis === 'num of objects') {
                const filteredData = data.predictions.filter((instance) => {
                    return instance.object_categories.includes(selectedObjName) 
                })
                console.log(filteredData)
    
                const filterGroups = (filteredData, xAxis) => {
                    const tempRecord = {}
                    return filteredData.map(filteredInstance => {
                        if(tempRecord[filteredInstance[xAxis]]) return
                        tempRecord[filteredInstance[xAxis]] = true
                        const instances = filteredData.filter(instance => instance[xAxis] === filteredInstance[xAxis])
                        return {
                            xGroup: filteredInstance[xAxis],
                            instances: instances
                        }
                    }).filter(x => x)
                }
                const filterResult = filterGroups(filteredData, 'num_objects')
                console.log(filterResult)
                //console.log("True")
                let ans = [
                    {
                        "xGroup": 12,
                        "size": 6,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                        {
                        "xGroup": 6,
                        "size": 3,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                        {
                        "xGroup": 8,
                        "size": 4,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                        {
                        "xGroup": 7,
                        "size": 1,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                        {
                        "xGroup": 3,
                        "size": 1,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                        {
                        "xGroup": 5,
                        "size": 7,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                        {
                        "xGroup": 28,
                        "size": 8,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                        {
                        "xGroup": 35,
                        "size": 2,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                        {
                        "xGroup": 14,
                        "size": 3,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                        {
                        "xGroup": 21,
                        "size": 3,
                        "Bleu_1": Math.random(),
                        "Bleu_2": 0.18207632418255743,
                        "Bleu_3": 0.10281797313233508,
                        "Bleu_4": 0.07219993072807154,
                        "CIDEr": 0.24507696727160197
                        },
                    ]
                setFilteredGroups(ans)
                // still not work on my Windows system
                const getScore = (data) => {
                    fetch('http://172.28.208.1:8080/api/v1/data/getScore', {method: 'POST'})
                        .then(res => res.json())
                        .then(score => console.log(score))
                        .catch(e => console.log(e))
                    }
                getScore()
            } else {
                const filteredData = data.predictions.filter((instance) => {
                    return instance.object_categories.includes(selectedObjName) 
                })
                console.log(filteredData)
    
                const filterGroups = (filteredData, xAxis) => {
                    const tempRecord = {}
                    return filteredData.map(filteredInstance => {
                        if(tempRecord[filteredInstance[xAxis]]) return
                        tempRecord[filteredInstance[xAxis]] = true
                        const instances = filteredData.filter(instance => instance[xAxis] === filteredInstance[xAxis])
                        return {
                            xGroup: filteredInstance[xAxis],
                            instances: instances
                        }
                    }).filter(x => x)
                }
                const filterResult = filterGroups(filteredData, 'num_objects')
                console.log(filterResult)
            }         
        }
        	    
    }, [data, selectedObjName, selectedObjNumber, selectedYaxis, selectedXaxis])

    return (
        <ScatterPlotDraw filteredGroups={filteredGroups} selectedObjNumber={selectedObjNumber} selectedObjName={selectedObjName} selectedYaxis={selectedYaxis} selectedXaxis={selectedXaxis}/>        
    )
    
}

export default ScatterPlot