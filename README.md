# React Testing Boundary

To run the project:

```
// react router v5 is not compatible with React17
// I use it on purpose so need to force
npm install --force

npm run dev
```

To run test

```
npm run test:watch
```

## Key Points

- See how we improve the [test here in this PR](https://github.com/HuyAms/react-testing-boundary/pull/1/files)
- [See the Slide here](https://github.com/HuyAms/react-testing-boundary/blob/main/slide/Testing%20Boundary%20-%20TechTalk.pdf)

1. **Focus mainly on integration tests**

2. **Mocking is a helpful tool**, just be mindful of its limitations — there’s no right or wrong; many times, we need and have to mock.  
   2a. It’s more about trade-off and balance  
   2b. Where do we draw the boundary?

3. **Use the Testing Boundary** to visualize what’s included in the current test scope

4. **Usage of `MockedProvider` and `MemoryRouter`**  
   4a. In the demo app, network request is the only thing we need to mock
