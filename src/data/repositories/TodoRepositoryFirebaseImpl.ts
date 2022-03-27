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
    where
} from 'firebase/firestore'

export default class TodoRepositoryFirebaseImpl implements TodoRepository {
    colRef: any

    async GetTodos(): Promise<Todo[]> {
        this.colRef = collection(db, 'todos')
        const data = await getDocs(this.colRef)
        const myTodos = data.docs.map((todo: any) => ({...todo.data(), id : todo.id }))
        return myTodos
    }

    async AddTodo(todo_description: string) {
        await addDoc(this.colRef, { description : todo_description })
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