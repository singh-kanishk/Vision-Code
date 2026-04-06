import { Button } from "@/components/ui/button"
import {
  Dialog, 
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { GeneratedCode } from "./utils/GeneratedCode"
import { useForm } from "react-hook-form"
import {
   Form,
   FormControl,
   FormMessage,
   FormField,
   FormItem,
 
 } from "@/components/ui/form"
import { useState } from "react"
import { useHostDrawingStore } from "@/store/useUserCanvasStore"
import { Sparkles } from "lucide-react"


interface PromptInterface{
    prompt:string
}

export function Generator() {
    const methods = useForm<PromptInterface>()
    const [generatedCode,setGeneratedCode]=useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string>('')
    const ref= useHostDrawingStore((state)=>(state.ref))

    async function onClick(data:PromptInterface) {
        try{
            setIsLoading(true)
            setError('')
            let base64='';
            if(ref.current){

               base64= ref.current.toDataURL({
              mimeType: 'image/png',
              pixelRatio: 1,
              quality:0.8
                                      })
            }
            
            const response = await fetch('http://localhost:3000/api/generate',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({prompt: data.prompt,image:base64}) 
            })
            
            const result = await response.json()

            if(!response.ok){
                setError(result?.body || `Error: ${response.status} ${response.statusText}`)
                setGeneratedCode('')
                return
            }
            
            if(!result.success) {
                setError(result.body || 'Failed to generate code')
                setGeneratedCode('')
                return
            }
            
            setGeneratedCode(result.body)
        }
        catch(error){
            const errorMsg =
              error instanceof TypeError
                ? 'Network error: unable to reach the generate API. Make sure backend is running and CORS is configured.'
                : error instanceof Error
                  ? error.message
                  : 'Unknown error occurred'
            setError(errorMsg)
            setGeneratedCode('')
        }
        finally {
            setIsLoading(false)
        }
    }
    
  return (

    <Form {...methods}>
    <Dialog>
      <form className="flex gap-2" onSubmit={methods.handleSubmit(onClick)}>
        <FormField
          control={methods.control}
          name="prompt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter prompt for code generation" type="text" {...field} disabled={isLoading} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <DialogTrigger asChild className="flex items-center">
          <Button type="submit" variant="outline" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate'} 
            <Sparkles className="items-center"/>
          </Button>
        </DialogTrigger>
        <GeneratedCode generatedCode={generatedCode} error={error}/>
      
        
      </form>
      
    </Dialog>
    </Form>
  )
}

