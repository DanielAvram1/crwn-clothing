import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDphg94p6_q8hEOXq8uYstLyZ1b3-H-1wM",
  authDomain: "crown-db-507e9.firebaseapp.com",
  projectId: "crown-db-507e9",
  storageBucket: "crown-db-507e9.appspot.com",
  messagingSenderId: "233779247183",
  appId: "1:233779247183:web:3cb4051e27f391fba4d23a",
  measurementId: "G-NQV720QTLX"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = userRef.get()

  if(!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account'})
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase