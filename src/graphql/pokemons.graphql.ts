import {gql, useQuery} from '@apollo/client';
import {Pokemon} from './pokemon';

export function useFetchPokemonsQuery() {
  const GET_POKEMONS = gql`
    query pokemons {
      pokemons {
        id
        name
        image
      }
    }
  `;
  return useQuery<{pokemons: Pokemon[]}>(GET_POKEMONS);
}
