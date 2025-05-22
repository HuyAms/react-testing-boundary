import {useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {useFetchPokemonsQuery} from './graphql/pokemons.graphql';
import {Loading} from './components/Loading';
import {PokemonCard} from './components/PokemonCard';
import {Checkbox} from './components/Checkbox';
import {ErrorMessage} from './components/ErrorMessage';

const TRAINING_MODE_QUERY_PARAM = 'trainingMode';

function App() {
  const location = useLocation();
  const history = useHistory();
  const searchQuery = new URLSearchParams(location.search);
  const initialTrainingMode = searchQuery.get(TRAINING_MODE_QUERY_PARAM) === 'true';
  const [trainingMode, setTrainingMode] = useState(initialTrainingMode);

  const {data: pokemonData, loading, error} = useFetchPokemonsQuery();

  function handleTrainingModeChange(checked: boolean) {
    setTrainingMode(checked);

    // update search params
    const newSearchParams = new URLSearchParams(searchQuery);
    newSearchParams.set(TRAINING_MODE_QUERY_PARAM, checked.toString());
    history.push({pathname: location.pathname, search: newSearchParams.toString()});
  }

  if (loading) {
    return <Loading message="Loading Pokémon..." />;
  }

  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Who's That Pokémon?</h1>

      <div className="flex justify-center mb-6">
        <Checkbox
          label="Training Mode"
          checked={trainingMode}
          onChange={handleTrainingModeChange}
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonData?.pokemons.map(pokemon => (
          <li key={pokemon.id}>
            <PokemonCard name={pokemon.name} imageSrc={pokemon.image} trainingMode={trainingMode} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
