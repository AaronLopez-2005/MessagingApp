import { create } from "zustand"
import api from "./api"
import storeSecure from "./storeSecure"
import utils from "./utils"

const globalState = create((set) => ({
  // Authenticated state
  authenticated: false,
  user: {},

  login: (user, credentials) => {
    storeSecure.set("credentials", credentials)
    set((state) => ({
      authenticated: true,
      user: user
    }))
  },

  logout: () => {
    storeSecure.remove("credentials")
    set((state) => ({
      authenticated: false,
      user: {}
    }))
  },

  // Initialization

  initialized: false,

  init : async () => {
    const credentials = await storeSecure.get("credentials")
    console.log("init", JSON.stringify(credentials))
    if (credentials) {
      // Calls django api
      api({
        method: 'POST',
        url : '/chat/signIn/',
        data : {
          username: credentials.username,
          password : credentials.password
        }
      })
      .then(response => {
        set((state) => ({
            initialized : true,
            authenticated: true,
            user: response.data.user
          })
        )
      })
      .catch(error => {
        set((state) => ({
          initialized: true
        }))
      })
    }
    else {
      set((state) => ({
        initialized : true
      }))
    }
  }
}))

export default globalState