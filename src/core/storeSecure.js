import * as SecureStore from 'expo-secure-store';

async function set(key, object) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(object))
  }
  catch (error) {
    console.log("Secure set: ", error)
  }
}

async function get(key) {
  try {   
    const data = await SecureStore.getItemAsync(key);

    if (data !== undefined) {
      return JSON.parse(data)
    }
  } catch (error) {
      console.log("Secure get: ", error)
  }
}

async function remove(key) {
  try {
    await SecureStore.deleteItemAsync(key)
  }
  catch (error) {
    console.log("Secure remove: ", error)
  }
}

export default { set, get, remove }