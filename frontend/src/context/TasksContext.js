import { createContext, useReducer } from 'react'

export const TasksContext = createContext()

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { 
        tasks: action.payload 
      }
    case 'CREATE_TASK':
      return { 
        tasks: [action.payload, ...state.tasks] 
      }
    case 'DELETE_TASK':
      // update tasks by deleting action.payload task
      return { 
        tasks: state.tasks.filter((task) => {return task._id !== action.payload._id})
      }
    default:
      return state
  }
}

// allows tasks state to be accessible within children components.
// dispatch is a function to update state, using the tasks reducer.
export const TasksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, { 
    tasks: null
  })
  
  return (
    <TasksContext.Provider value={{ ...state, dispatch }}>
      { children }
    </TasksContext.Provider>
  )
}
