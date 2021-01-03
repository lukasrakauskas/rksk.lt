import { useState, useEffect, useContext, createContext } from 'react'
import nookies from 'nookies'
import firebase from './firebase'

const AuthContext = createContext({
  user: null,
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const logout = () => {
    setUser(null)
    nookies.destroy(null, 'token')
    nookies.set(null, 'token', '', {})
  }

  const login = async (email, password) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      console.log(`token changed!`)
      if (!user) {
        console.log(`no token found...`)
        setUser(null)
        nookies.destroy(null, 'token')
        nookies.set(null, 'token', '', {})
        return
      }

      console.log(`updating token...`)
      const token = await user.getIdToken()
      setUser(user)
      nookies.destroy(null, 'token')
      nookies.set(null, 'token', token, {})
    })
  }, [])

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      console.log(`refreshing token...`)
      const user = firebase.auth().currentUser
      if (user) await user.getIdToken(true)
    }, 10 * 60 * 1000)
    return () => clearInterval(handle)
  }, [])

  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
