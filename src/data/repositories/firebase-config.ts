import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB4_D9y8m_1wL3pdU8TXxW10kOn5WHw7Qo",
    authDomain: "justine-todo-app.firebaseapp.com",
    projectId: "justine-todo-app",
    storageBucket: "justine-todo-app.appspot.com",
    messagingSenderId: "26013585647",
    appId: "1:26013585647:web:1f91703517916a59a64b1a"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)