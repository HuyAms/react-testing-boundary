import {afterEach, expect, it, vi} from 'vitest';
import {render, screen, within} from '@testing-library/react';
import App from './App';
import {ApolloError} from '@apollo/client';
import {useLocation} from 'react-router-dom';
import {useFetchPokemonsQuery} from './graphql/pokemons.graphql';
import {userEvent} from '@testing-library/user-event';

const user = userEvent.setup();

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

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: vi.fn().mockReturnValue({
    pathname: '/',
    search: '',
  }),
  useHistory: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}));

vi.mock('./graphql/pokemons.graphql', () => ({
  useFetchPokemonsQuery: vi.fn(),
}));

function renderComponent() {
  return render(<App />);
}

afterEach(() => {
  vi.clearAllMocks();
});

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
  expect(screen.getByRole('heading', {name: /Who's That Pokémon?/i})).toBeVisible();

  // Normal mode
  const trainingModeCheckbox = screen.getByLabelText(/training mode/i);
  expect(trainingModeCheckbox).not.toBeChecked();

  // List of pokemons
  const pokemonList = screen.getAllByRole('listitem');
  expect(pokemonList).toHaveLength(MOCKED_POKEMONS.length);

  const firstPokemon = MOCKED_POKEMONS[0];
  const firstPokemonCard = within(pokemonList[0]).getByTestId('pokemon-card');
  expect(within(firstPokemonCard).getByText(firstPokemon.name)).toBeVisible();

  const pokemonImg = within(firstPokemonCard).getByAltText(firstPokemon.name);
  expect(pokemonImg).toBeVisible();
  expect(pokemonImg).toHaveAttribute('src', firstPokemon.image);
});

it('loading state', () => {
  vi.mocked(useFetchPokemonsQuery, {partial: true}).mockReturnValueOnce({
    data: {
      pokemons: MOCKED_POKEMONS,
    },
    loading: true,
    error: undefined,
  });

  renderComponent();

  expect(screen.getByText(/loading.../i)).toBeVisible();
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

  expect(screen.getByText(errorMessage)).toBeVisible();
});

it('hovers card in training mode', async () => {
  vi.mocked(useFetchPokemonsQuery, {partial: true}).mockReturnValue({
    data: {
      pokemons: MOCKED_POKEMONS,
    },
    loading: false,
    error: undefined,
  });

  renderComponent();

  const trainingModeCheckbox = screen.getByLabelText(/training mode/i);
  await user.click(trainingModeCheckbox);

  const pokemonList = screen.getAllByRole('listitem');
  const firstPokemonCard = within(pokemonList[0]).getByTestId('pokemon-card');
  const firstPokemon = MOCKED_POKEMONS[0];

  expect(within(firstPokemonCard).getByText('?')).toBeVisible();
  expect(within(firstPokemonCard).getByAltText(/silhouette/i)).toBeVisible();

  await user.hover(firstPokemonCard);

  expect(within(firstPokemonCard).getByText(firstPokemon.name)).toBeVisible();
  expect(within(firstPokemonCard).getByAltText(firstPokemon.name)).toBeVisible();

  await user.unhover(firstPokemonCard);
  expect(within(firstPokemonCard).getByText('?')).toBeVisible();
});

it('persists training mode with URL', () => {
  vi.mocked(useLocation, {partial: true}).mockReturnValue({
    pathname: '/',
    search: '?trainingMode=true',
  });

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
