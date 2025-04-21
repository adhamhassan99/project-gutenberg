import { FormEvent, useState } from 'react'
import './App.css'
import { Loader2 } from "lucide-react"
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { useAnalyzeBook } from './hooks/useAnalyzeBook'
import FlowWithProvider from './components/custom/InteractionVisualizer'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

function App() {
  const [isDisabled, setIsDisabled] = useState(true)
  const { analyzeBook } = useAnalyzeBook()
  const { mutate, isPending, data, reset, isSuccess, } = useMutation({ mutationKey: ['analyze book'], mutationFn: async (bookId: string) => analyzeBook(bookId) })
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const bookId = formData.get('bookId') as string
    mutate(bookId, {
      onError(error) {
        console.log(error.message)
        toast(error.message, { style: { backgroundColor: 'red', color: 'white' } })
      },
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisabled(!e.target.value.trim())
  }


  return (
    <div id='mainBg' className=' h-full flex flex-col p-5 justify-center'>
      <div className='self-center min-w-[450px]'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <Label htmlFor="bookId">Enter your Book Id</Label>
          <Input
            type="text"
            id="bookId"
            name="bookId"
            placeholder="BookId"
            onChange={handleInputChange}
          />
          <div className="flex gap-2 w-full">
            {isPending ? (
              <Button className='flex-1' disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <>

                <Button className='flex-1' disabled={isDisabled}>Analyze</Button>
                {
                  isSuccess && data && (
                    <Button onClick={reset} variant={'outline'} className='flex-1'>Re-run</Button>
                  )
                }
              </>

            )}
          </div>
        </form>
      </div>
      {data && data.length > 0 &&
        <div className="flex-1 mt-5 border rounded-md">
          <FlowWithProvider interactions={data} />
        </div>
      }
    </div>
  )
}

export default App
