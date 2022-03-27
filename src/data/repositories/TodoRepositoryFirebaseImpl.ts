import Todo from "domain/entities/Todo"
import TodoRepository from "domain/repositories/TodoRepository"
import { db } from "./firebase-config"
import { 
    collection,
    getDocs,
    orderBy,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    serverTimestamp
} from 'firebase/firestore'

export default class TodoRepositoryFirebaseImpl implements TodoRepository {
    colRef: any

    async GetTodos(): Promise<Todo[]> {
        this.colRef = collection(db, 'todos')
        const getQuery = query(this.colRef, orderBy('createdAt', 'desc'))
        const data = await getDocs(getQuery)
        const myTodos = data.docs.map((todo: any) => ({id : todo.id, description: todo.data().description }))
        return myTodos
    }

    async AddTodo(todo_description: string) {
        await addDoc(this.colRef, { description : todo_description, createdAt : serverTimestamp() })
    }

    async UpdateTodo(todo: Todo) {
        const docRef = doc(db, 'todos', todo.id)
        await updateDoc(docRef, {
            description : todo.description
        })
    }

    async DeleteTodo(todo_id: string) {
        const docRef = doc(db, 'todos', todo_id)
        await deleteDoc(docRef)
        .then(() => console.log('Todo is deleted in data/repositories todos (2)'))
        .catch(error => console.log(error))
    }


}