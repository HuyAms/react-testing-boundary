import {ApolloClient, InMemoryCache} from '@apollo/react-hooks';
import {ApolloLink, Observable} from '@apollo/client';
import {pokemonData} from './data/pokemon';

const artificialDelay = 2000;

const mockLink = new ApolloLink(operation => {
  return new Observable(observer => {
    const {operationName} = operation;

    if (operationName === 'pokemons') {
      setTimeout(() => {
        observer.next({
          data: {
            pokemons: pokemonData,
          },
        });
        observer.complete();
      }, artificialDelay);
    } else {
      observer.error(new Error('Unknown operation'));
    }
  });
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link: mockLink,
  cache,
});
