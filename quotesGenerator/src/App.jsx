
import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const[quote, setQuote] = useState({
    text: '',
    author: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  //Display random quotes
  const fetchQuote = async () =>{
    try {
      setIsLoading(true);
      const response = await fetch("http://api.quotable.io/random")

      if(!response.ok){
        throw new Error("Erreur serveur")
      }

      const data = await response.json()

      setQuote({
        text: data.content,
        author: data.author
      })
    } catch(error){
      console.error("Erreur", error);
    } finally{
      setIsLoading(false)
    }
    
  }

  useEffect(() =>{
    fetchQuote()
  }, [])

  return (
    <div className='flex flex-col justify-center align-center gap-4'>
      <h1 className='text-white text-center text-4xl'>Quote generator</h1>
      {isLoading && <p>Loading...</p>}
      <div 
      className='block bg-neutral-100 w-100 rounded text-center h-auto flex flex-col justify-center p-2'
      >
        <blockquote>{quote.text}</blockquote>
        
        <strong>~{quote.author}~</strong>

        </div>
      <button className='bg-green-400 p-2 rounded-lg hover:bg-green-500 hover:cursor-pointer' onClick={fetchQuote}>Generate</button>

    </div>
  )
}

export default App
