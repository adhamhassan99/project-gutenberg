import { FormEvent, useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Label } from './components/ui/label'
import { useFetchBookText } from './hooks/useFetchBookText'

function App() {
  const [isDisabled, setIsDisabled] = useState(true)
  const { mutate } = useFetchBookText()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const bookId = formData.get('bookId') as string
    console.log('Submitted Book ID:', bookId)
    mutate(bookId)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDisabled(!e.target.value.trim())
  }

  return (
    <div>
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
    </div>
  )
}

export default App
