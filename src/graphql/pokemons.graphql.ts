import {gql, useQuery} from '@apollo/client';

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
  return useQuery(GET_POKEMONS);
}
