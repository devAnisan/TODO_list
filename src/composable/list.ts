import { ref } from 'vue'

const STORAGE_KEY = 'tasks-list'

interface listTask {
  id: number
  descTask: string
  status: boolean
}
const inputRef = ref<HTMLElement | null>(null)
const tasks = ref<listTask[]>([])

const savedTaks = localStorage.getItem(STORAGE_KEY)
if (savedTaks) {
  tasks.value = JSON.parse(savedTaks)
}

const saveInStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
}

export const useList = () => {
  const addTask = (newTask: string) => {
    tasks.value.push({
      id: Date.now(),
      descTask: newTask,
      status: false,
    })
    saveInStorage()
    inputRef.value?.focus()
  }

  const endTask = (idTask: number) => {
    const taskFinded = tasks.value.find((t) => t.id === idTask)
    if (taskFinded) {
      taskFinded.status = true
    }
    saveInStorage()
  }

  const deleteTask = (idTask: number) => {
    tasks.value = tasks.value.filter((t) => t.id !== idTask)
    saveInStorage()
  }

  return {
    addTask,
    endTask,
    deleteTask,
    inputRef,
    tasks,
  }
}
