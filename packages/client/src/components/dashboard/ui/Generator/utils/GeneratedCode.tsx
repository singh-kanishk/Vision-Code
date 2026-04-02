import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface GeneratedCodeProp{
    generatedCode:string
    error?:string
}

export function GeneratedCode(prop:GeneratedCodeProp) {
    const handleCopyCode = () => {
        navigator.clipboard.writeText(prop.generatedCode)
        alert('Code copied to clipboard!')
    }

  return (
   
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generated Code</DialogTitle>
          </DialogHeader>
          {prop.error ? (
            <div className="bg-red-100 text-red-800 p-3 rounded">
              {prop.error}
            </div>
          ) : (
            <Textarea 
              className="cursor-cell font-mono text-sm h-96" 
              readOnly
              value={prop.generatedCode || 'No code generated yet. Submit a prompt to generate code.'}
            />
          )}
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
            {prop.generatedCode && !prop.error && (
              <Button type="button" onClick={handleCopyCode}>Copy Code</Button>
            )}
          </DialogFooter>
        </DialogContent>
      
  )
}
