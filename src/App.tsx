import {useState} from 'react';
import {pokemonData} from './graphql/pokemon';
import {useFetchPokemonsQuery} from './graphql/pokemons.graphql';
import {Loading} from './components/Loading';
import {PokemonCard} from './components/PokemonCard';
import {Checkbox} from './components/Checkbox';

function App() {
  const [trainingMode, setTrainingMode] = useState(false);

  const {loading, error} = useFetchPokemonsQuery();

  if (loading) {
    return <Loading message="Loading Pokémon..." />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Who's That Pokémon?</h1>

      <div className="flex justify-center mb-6">
        <Checkbox
          label="Training Mode"
          checked={trainingMode}
          onChange={() => setTrainingMode(!trainingMode)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonData.map(pokemon => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            imageSrc={pokemon.image}
            trainingMode={trainingMode}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
