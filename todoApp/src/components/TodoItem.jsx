import { Edit, Trash } from 'lucide-react'
import React, { useState } from 'react'

export default function TodoItem({todo, onDelete}) {
    
    

  return (
    <div className='flex bg-neutral-100 rounded-lg p-4 justify-between gap-5'>   
        <li key={todo.id}>{todo.title}</li>
        <div className='flex flex-row gap-3'>
            <button onClick={(e)=> onDelete(todo.id)}><Trash color='red'/></button>
        </div>
    </div>
  )
}
