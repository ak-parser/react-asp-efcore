import { waitFor } from '@testing-library/react';
import React from 'react';
import ReactDOMClient from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders without crashing', async () => {
  const div = document.createElement('div');
  act(() => {
    ReactDOMClient.createRoot(div).render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);
  })
});
