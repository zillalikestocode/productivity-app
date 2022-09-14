import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB_V1Po6F-2-jusFm458wTh4wVXwTdwUr4",
    authDomain: "productivity-app-88c4d.firebaseapp.com",
    projectId: "productivity-app-88c4d",
    storageBucket: "productivity-app-88c4d.appspot.com",
    messagingSenderId: "267048890389",
    appId: "1:267048890389:web:7712b501c6dc739a9d9e1c",
    measurementId: "G-X490VZJDTZ"
  };

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)