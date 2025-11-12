
import './App.css'
import { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'

function App() {

  const [input, setInput] = useState('')

  //Récupérer les autres todos existants dans le local storage
  const savedTodos = localStorage.getItem("todos")

  //Vérifier s'il existe déjà des todos. Si oui renvoyer la liste en question si non renvoyer une liste vide
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos, setTodos] = useState(initialTodos)

  useEffect(() =>{
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addOn(event){
    event.preventDefault()

    //Vérifier si le champ soumis n'est pas vide

    if(input.trim() == ""){
      return alert('Please enter a task')
    }

    const newTodo = {
      id: Date.now(),
      title: input.trim()
    }

    //Ajouter le nouveau "todo" à la liste déja existante
    const newTodos = [newTodo, ...todos]

    setTodos(newTodos)
    setInput("")
    console.log(newTodos);
    
  }
  
  //Pour supprimer des tâches
  function deleteTask(id){
    const temp = todos.filter((todo) => todo.id !== id)
    setTodos(temp)
  }

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-white text-4xl text-center font-bold'>React Todo List</h1>

      <form className='flex flex-row justify-center p-5 rounded-lg w-auto gap-4 bg-blue-900'  onSubmit={addOn}>
        <input
        type='text'
        className='block w-full bg-gray-50 border border-gray-300 text-gray-900  px-2 rounded-lg focus:border-sky-500 focus:outline-3 focus:outline-sky-500'
        value={input}
        placeholder='Entrer...'
        onChange={(e) => setInput(e.target.value)}
        />

        <button 
        type='submit'
        className='p-2 rounded  w-100 bg-sky-500 hover:bg-sky-700 hover:text-white'
        onSubmit={addOn}
        >
          Add 
        </button>
      </form>
      {todos.length > 0 ? (
        <div>
        <ul className='flex flex-col gap-5'>
          {
            todos.map((todo) =>(
              <TodoItem 
              todo={todo}
              onDelete={deleteTask} 
              />
            ))
            
          }
        </ul>
          
      </div>
      ):(
        <p>Aucune pour l'instant</p>
      )}
      
    </div>
  )
}

export default App
