import { FormEvent, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { useAnalyzeBook } from './hooks/useAnalyzeBook'
import FlowWithProvider from './components/custom/InteractionVisualizer'

function App() {
  const [isDisabled, setIsDisabled] = useState(true)
  const [result, setResult] = useState<{ source: string, target: string, totalCount: number }[] | undefined>([])
  const { analyzeBook } = useAnalyzeBook()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const bookId = formData.get('bookId') as string
    console.log('Submitted Book ID:', bookId)
    const res = await analyzeBook(bookId)
    setResult(res)
    console.log(res, ' app')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisabled(!e.target.value.trim())
  }
  console.log({ result })
  return (
    <div className=' h-full flex flex-col p-10'>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
          <Label htmlFor="bookId">Enter your Book Id</Label>
          <Input
            type="text"
            id="bookId"
            name="bookId"
            placeholder="BookId"
            onChange={handleInputChange}
          />
          <Button disabled={isDisabled}>Analyze</Button>
        </form>
      </div>
      <div className="flex-1">
        {result && result.length > 0 && <FlowWithProvider interactions={result} />}
      </div>
    </div>
  )
}

export default App
