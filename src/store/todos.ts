import { defineStore } from 'pinia'

interface Todo {
  text: string
  id: number
  isFinished: boolean
}

interface TodoState {
  todos: Array<Todo>
  filter: FilterType
  nextId: number
}

enum FilterType {
  all,
  finished,
  unfinished,
}

export const todos = defineStore('todos', {
  state: (): TodoState => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: FilterType.all,
    // type will be automatically inferred to number
    nextId: 0,
  }),
  getters: {
    finishedTodos(state) {
      // autocompletion! ✨
      return state.todos.filter((todo) => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter((todo) => !todo.isFinished)
    },
    /**
     * @returns {{ text: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(): Array<Todo> {
      if (this.filter === FilterType.finished) {
        // call other getters with autocompletion ✨
        return this.finishedTodos
      } else if (this.filter === FilterType.unfinished) {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    // any amount of arguments, return a promise or not
    addTodo(text: string) {
      // you can directly mutate the state
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    },
  },
})
