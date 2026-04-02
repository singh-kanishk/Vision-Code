import { useState } from "react"
import { Slider } from "@/components/ui/slider"



export function ShapeSelector(){
    const arrayOfShape:string[]= ['square','circle','slash']
    const [value, setValue] = useState([50])

    return (
        <div className="flex flex-col p-2 gap-2 bg-gray-100 rounded-lg h-fit min-w-full">
              <span className="text-l font-medium text-gray-700">Shape:</span>
              
              <div className="flex gap-3">
                    {arrayOfShape.map((shape)=>(
                        <div className="text-3xl"><i className={`fi fi-rr-${shape}`}></i></div>
                    ))}
              </div>
              <div className="flex w-full max-w-sm flex-col gap-4">
      {/* <Progress value={value[0]} /> */}
      <div className="flex">
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={1}
      />
      <span>{value}</span>
      </div>
    </div>
        </div>
    )
}