// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [{status, pokemon, error}, setState] = React.useState({status: "idle", pokemon: null, error: null})

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: "pending"})
    fetchPokemon(pokemonName)
      .then(pokemon => {
        setState({status: "resolved", pokemon: pokemon})
      },
      error => {
        setState({status: "rejected", error: error})
      })
  }, [pokemonName])

  // eslint-disable-next-line default-case
  switch (status) {
    case "idle":
      return 'Submit a pokemon'
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />
    case "rejected":
      return <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
    case "resolved":
      return <PokemonDataView pokemon={pokemon} />
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App
