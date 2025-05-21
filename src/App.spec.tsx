import {expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';
import {ApolloError} from '@apollo/client';
import {useLocation} from 'react-router-dom';
import {useFetchPokemonsQuery} from './graphql/pokemons.graphql';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  // ✋ For now, it only has pathname and search, but what if we need more things from the useLocation?
  // We need to update all the mocks here
  useLocation: vi.fn().mockReturnValue({
    pathname: '/',
    search: '',
  }),
  useHistory: vi.fn(),
}));

vi.mock('./graphql/pokemons.graphql', () => ({
  useFetchPokemonsQuery: vi.fn(),
}));

function renderComponent() {
  return render(<App />);
}

const MOCKED_POKEMONS = [
  {
    id: 1,
    name: 'Pikachu',
    image: 'https://example.com/pikachu.png',
  },
  {
    id: 2,
    name: 'Charmander',
    image: 'https://example.com/charmander.png',
  },
];

it('renders list of pokemons', () => {
  // Setup: prepare data
  vi.mocked(useFetchPokemonsQuery, {partial: true}).mockReturnValueOnce({
    data: {
      pokemons: MOCKED_POKEMONS,
    },
    loading: false,
    error: undefined,
  });

  // Act
  renderComponent();

  // Expect
  screen.getByRole('heading', {name: /Who's That Pokémon?/i});
  const trainingModeCheckbox = screen.getByLabelText(/training mode/i);
  expect(trainingModeCheckbox).not.toBeChecked();

  const pokemonList = screen.getAllByRole('listitem');
  expect(pokemonList).toHaveLength(MOCKED_POKEMONS.length);
});

it('loading state', () => {
  vi.mocked(useFetchPokemonsQuery, {partial: true}).mockReturnValueOnce({
    data: {
      // ✋ We made a mistake here — data should initially be empty while loading.
      // that's how mocking is not always the same as the real version
      pokemons: MOCKED_POKEMONS,
    },
    loading: true,
    error: undefined,
  });

  renderComponent();

  screen.getByText(/loading.../i);
});

it('error state', () => {
  const errorMessage = 'Error fetching pokemons';
  vi.mocked(useFetchPokemonsQuery, {partial: true}).mockReturnValueOnce({
    data: undefined,
    loading: false,
    error: new ApolloError({
      networkError: new Error(errorMessage),
    }),
  });

  renderComponent();

  screen.getByText(errorMessage);
});

it('persists training mode with URL', () => {
  vi.mocked(useLocation, {partial: true}).mockReturnValue({
    pathname: '/',
    search: '?trainingMode=true',
  });

  // ✋ We are kinda copy-pasting the same mock for the query around
  vi.mocked(useFetchPokemonsQuery, {partial: true}).mockReturnValueOnce({
    data: {
      pokemons: MOCKED_POKEMONS,
    },
    loading: false,
    error: undefined,
  });

  renderComponent();

  const trainingModeCheckbox = screen.getByLabelText(/training mode/i);
  expect(trainingModeCheckbox).toBeChecked();
});
