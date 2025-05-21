import {expect, afterEach} from 'vitest';
import {cleanup} from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';

expect.extend(matchers);

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// If you need to add more global configurations for your tests,
// add them below this line
