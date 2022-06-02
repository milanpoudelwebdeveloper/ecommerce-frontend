import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCCr-SJKEPP9i052k47QxYKCO8w4vbbAKY',
  authDomain: 'ecommerce-project-44baf.firebaseapp.com',
  projectId: 'ecommerce-project-44baf',
  storageBucket: 'ecommerce-project-44baf.appspot.com',
  messagingSenderId: '813826355957',
  appId: '1:813826355957:web:00e0b4783457d8005c0bbc',
}

//initialize firebase
const app = initializeApp(firebaseConfig)

//initialize auth
export const auth = getAuth(app)
// export const googleAuthProvider = new app.auth.googleAuthProvider();
