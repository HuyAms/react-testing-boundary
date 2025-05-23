import {afterEach, expect, it, vi} from 'vitest';
import {render, screen, waitForElementToBeRemoved, within} from '@testing-library/react';
import App from './App';
import {ApolloError} from '@apollo/client';
import {MemoryRouter} from 'react-router-dom';
import {GET_POKEMONS} from './graphql/pokemons.graphql';
import {userEvent} from '@testing-library/user-event';
import {MockedProvider, MockedResponse} from '@apollo/client/testing';

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

type Options = {
  mocks?: MockedResponse[];
  initialEntries?: string[];
};

const pokemonSuccessResponse = {
  request: {
    query: GET_POKEMONS,
  },
  result: {
    data: {
      pokemons: MOCKED_POKEMONS,
    },
  },
};

function renderComponent(options: Options = {}) {
  const {mocks = [], initialEntries = ['/']} = options;

  const wrapper = ({children}: {children: React.ReactNode}) => (
    <MockedProvider mocks={[...mocks, pokemonSuccessResponse]}>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </MockedProvider>
  );

  return render(<App />, {wrapper});
}

afterEach(() => {
  vi.clearAllMocks();
});

it('renders list of pokemons', async () => {
  // Act
  renderComponent();

  // loading
  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

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

it('error state', async () => {
  const errorMessage = 'Error fetching pokemons';

  const errorResponse = {
    request: {
      query: GET_POKEMONS,
    },
    error: new ApolloError({
      networkError: new Error(errorMessage),
    }),
  };

  renderComponent({mocks: [errorResponse]});

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  expect(screen.getByText(errorMessage)).toBeVisible();
});

it('hovers card in training mode', async () => {
  renderComponent();

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

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

it('persists training mode with URL', async () => {
  renderComponent({initialEntries: ['/?trainingMode=true']});

  await waitForElementToBeRemoved(() => screen.getByText(/loading.../i));

  const trainingModeCheckbox = screen.getByLabelText(/training mode/i);
  expect(trainingModeCheckbox).toBeChecked();
});
