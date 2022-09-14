//@ts-nocheck
import React, { useContext, useState, useEffect} from "react";
import {auth, db } from "../firebase-config";
import {collection,addDoc,setDoc,getDoc,doc, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore";
import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut} from "firebase/auth";

const AuthContext = React.createContext();
const userDb = collection(db, "users");

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({
    children
}) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState()
    const [userInfo, setData] = useState();
    const [loading, setLoading] = useState(true)
    const [sidebar, setSidebar] = useState(false)
    const [addPrompt, setAdd] = useState(false)
    const [addEvent, setEvent] = useState(false)
    // const today = date.getFullYear() + '-' + (String(date.getMonth()).length === 1 ? '0' +(date.getMonth() + 1) : date.getMonth() + 1) + '-' + (String(date.getDate()).length === 1 ? '0' + date.getDate() : date.getDate())

    const avatars = [
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=360&t=st=1661735839~exp=1661736439~hmac=aa770631f9fde611a82fc7f365d10deaffce64a818ed7f1e6b745a511f13b650',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-long-hair_23-2149436197.jpg?w=360&t=st=1661737144~exp=1661737744~hmac=d46ffccd576a2ff30f4d93b3b9845e1bda0d0e6760fb43cd687a41f2086caf3b',
    'https://img.freepik.com/free-psd/3d-illustration-person_23-2149436182.jpg?w=360&t=st=1661738014~exp=1661738614~hmac=5bd0bdfd2fc6da8712536a06a6f1f0f9899813a2e67a3d76a903fcb4fffd0bea',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?t=st=1661734786~exp=1661735386~hmac=becb0f8f290cd1439e71c94274265108c907f433304c58f6214f03e03cea0c7b',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-rainbow-sunglasses_23-2149436196.jpg?w=360&t=st=1661738336~exp=1661738936~hmac=ed20a9a879cd57cf5cba6e206beaef7a2f6835da52680ebc829afa9b3abb9150',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses-green-hair_23-2149436201.jpg?w=360&t=st=1661738537~exp=1661739137~hmac=f5c5feb5756d6820e618641dacab455d3b34a54e014a25c73e98e2e2a4219e79',
    'https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436185.jpg?w=360&t=st=1661738618~exp=1661739218~hmac=26dd188a11487fa89b7349292b41829bcc659bf8dfd2c9048940f729ea5760c7'
    ]
    //Settings functions
    const changeImg = async(newImg)=>{
        try{
            await updateDoc(doc(db, 'users', currentUser?.email), {
                img: newImg
            })
            setData((prev) => ({...prev, img: newImg}))
        }catch(err){
            console.log(err.message)
        }
    }
    const changeName = async(newName)=>{
        try{
            await updateDoc(doc(db, 'users', currentUser?.email), {
                name: newName
            })
            setData((prev) => ({...prev, name: newName}))
        }catch(err){
            console.log(err.message)
        }
    }
// Authentication
    const signUp = async ({
        email,
        password,
        name,
        firstName,
        lastName
    }) => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "users", email), {
                name: `${firstName} ${lastName}`,
                img: avatars[0]
            });
            const data = await getDoc(doc(db, "users", email));
            if (data.exists()) {
                await setData(data.data());
            }
        } catch (error) {
            console.log(error.message);
            setError('Unable to create account')
            setLoading(false)
        }
    };

    const signIn = async ({
        email,
        password
    }) => {
        try {
            const user = await signInWithEmailAndPassword(auth, email, password);
            const data = await getDoc(doc(db, "users", email));
            if (data.exists()) {
                await setData(data.data());
            }
        } catch (error) {
            console.log(error.message);
            setError("Incorrect log in credentials")
            setLoading(false)
        }
    };

    const leave = async () => {
        await signOut(auth)
            .then(() => console.log('User signed out'))
            .catch(err => console.log(err))

        setUser(undefined)
        setData(undefined)
    };


//Todo functions
    const deleteTodo = async(todoData)=>{
        try {
            await updateDoc(doc(db, 'users', currentUser?.email), {
                todos: arrayRemove(todoData)
            })
            setData((prev) => ({...prev, todos: prev?.todos.filter((todo)=> todo !== todoData)}))
        }catch(err){
            console.log(err.message)
        }
    }
    const addToTodo = async(todoData) => {
        try{
            await updateDoc(doc(db, 'users', currentUser?.email), {
                    todos: arrayUnion(todoData)
            })
            setData((prev)=> ({...prev, todos: [...prev?.todos, todoData]}))
        }catch(err){
            console.log(err.message)
        }
    }
    const addToCompleted = async(todoData)=>{
        try{
            await updateDoc(doc(db, 'users', currentUser?.email), {
                completed: arrayUnion(todoData)
            })
            setData(prev => ({...prev, completed: [...prev.completed, todoData]}))
        }catch(err){
            console.log(err.message)
        }
    }
    const deleteAllCompleted = async()=>{
        try{
            await updateDoc(doc(db, 'users', currentUser?.email), {
                completed: []
            })
            setData(prev => ({...prev, completed: []}))
        }catch(err){
            console.log(err.message)
        }
    }
    const deleteCompleted = async(data)=>{
        try{
            await updateDoc(doc(db, 'users', currentUser?.email), {
                completed: arrayRemove(data)
            })
            setData(prev => ({...prev, completed: prev.completed.filter(item => item !== data)}))
        }catch(err){
            console.log(err.message)
        }
    }
    // Events functions
    const addToEvents = async(eventsData) => {
        try{
            await updateDoc(doc(db, 'users', currentUser?.email), {
                    events: arrayUnion(eventsData)
            })
            setData((prev)=> ({...prev, events: [...prev?.events, eventsData]}))
        }catch(err){
            console.log(err.message)
        }
    }
    const deleteEvents = async(eventData)=>{
        try{
            await updateDoc(doc(db, "users", currentUser?.email), {
                events: arrayRemove(eventData)
            })
            setData(prev => ({...prev, events: prev?.events.filter(item => item !== eventData)}))
        }catch(err){
            console.log(err.message)
        }
    }
    const value = {
        currentUser,
        signUp,
        userInfo,
        setData,
        loading,
        setLoading,
        leave,
        sidebar,
        setSidebar,
        signIn,
        error,
        setError,
        addToTodo,
        addPrompt,
        setAdd,
        avatars,
        changeImg,
        changeName,
        deleteTodo,
        addToCompleted,
        deleteCompleted,
        deleteAllCompleted,
        setEvent,
        addEvent,
        addToEvents,
        deleteEvents,
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return unsubscribe;
    }, []);
    useEffect(() => {
        async function getInfo() {
            if (currentUser?.email) {
                const data = await getDoc(doc(db, "users", currentUser?.email));
                if (data.exists()) {
                    await setData(data.data());
                }
            }
        }
        getInfo()
    }, [currentUser]);
    // useEffect(() => {
    //     for(let i = 1; i <= userInfo?.events.length; i ++){
    //         if (userInfo?.events[i].date < Number(today.split('-').join())){
    //             updateDoc(doc(db, 'users', currentUser?.email),{
    //                 events: arrayRemove(userInfo?.events[i])
    //             })
    //         }
    //     }
    // }, [])
    return <AuthContext.Provider value = {
        value
    } > {
        children
    } </AuthContext.Provider>;
};
