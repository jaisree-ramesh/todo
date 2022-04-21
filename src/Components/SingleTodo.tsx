import React, {useEffect, useState, useRef} from 'react'
import { Todo } from '../model'
import { Icon } from '@iconify/react';
import './styles.css'
import TodoList from './TodoList';

type Props = {
    todo: Todo,
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ( {todo, todos, setTodos}: Props) => {

    const [edit,setEdit] = useState<boolean>(false)
    const [editedTodo, setEditedTodo] = useState<string>(todo.todo)



    const handleDone = (id:number) => {
        setTodos( todos.map((todo)=> 
            todo.id===id?{...todo,isDone:!todo.isDone}:todo))

    }

    const handleDelete = (id:number) => {
        setTodos( todos.filter((todo)=> todo.id!==id))
    }

    const handleEdit = (e:React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo)=> 
            todo.id === id ? {...todo, todo:editedTodo} : todo))
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

  return (
    <form className='todoSingle' onSubmit ={(e)=> handleEdit(e, todo.id) }>
        { 
            edit ? (
                <input ref={inputRef} value={editedTodo} onChange={(e) => setEditedTodo(e.target.value)} className='singleText' />
            ) : (
                todo.isDone? (
                        <s className='singleText'>{todo.todo}</s>
                    ) : (
                        <span className='singleText'>{todo.todo}</span>         
                         )
                )  
        }
        <div>
            <span className="icon" onClick={ () => {
                if (!edit && !todo.isDone) {
                    setEdit(!edit);
                }
            }}>
                <Icon icon="ant-design:edit-outlined" color="black" width="24" inline={true} />
            </span>
            <span className="icon" onClick={()=> handleDelete(todo.id)}>
                <Icon icon="ant-design:delete-outlined" color="black" width="24" inline={true} />
            </span>
            <span className="icon" onClick={()=> handleDone(todo.id)} >
                <Icon icon="ic:sharp-done" color="black" width="25" inline={true} />
            </span>
        </div>
    </form>
  )
}

export default SingleTodo