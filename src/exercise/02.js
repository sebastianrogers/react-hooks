// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

function useLocalStorageState(key, defaultValue = '', {serialise = JSON.stringify, deserialise = JSON.parse} = {}) {
  const [state, setState] = React.useState(
    () => {
      const localStorageValue = window.localStorage.getItem(key);
      if (localStorageValue) {
        return deserialise(localStorageValue);
      }

      return defaultValue;
    }
  )

  React.useEffect(() => {window.localStorage.setItem(key, serialise(state))}, [key, serialise, state])

  return [state, setState]
}


function Greeting({initialName = ''}) {

  function handleChange(event) {
    setName(event.target.value)
    setObject({name: event.target.value})
  }

  const [name, setName] = useLocalStorageState('name', initialName);
  const [object, setObject] = useLocalStorageState('object', {name: initialName})

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
      [{object.name}]
    </div>
  )
}

function App() {
  return <Greeting initialName="toad" />
}

export default App
