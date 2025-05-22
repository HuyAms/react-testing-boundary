import {gql, useQuery} from '@apollo/client';
import {Pokemon} from '../data/pokemon';

export const GET_POKEMONS = gql`
  query pokemons {
    pokemons {
      id
      name
      image
    }
  }
`;

export function useFetchPokemonsQuery() {
  return useQuery<{pokemons: Pokemon[]}>(GET_POKEMONS);
}
