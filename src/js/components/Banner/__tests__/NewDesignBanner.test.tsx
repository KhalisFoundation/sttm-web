import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NewDesignBanner from '../NewDesignBanner';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <NewDesignBanner />
    </MemoryRouter>
  );

describe('NewDesignBanner', () => {
  it('opens the current page in the new design', () => {
    renderAt('/shabad?id=1');
    expect(screen.getByText('Try the new design')).toHaveAttribute(
      'href',
      'https://next.sikhitothemax.org/shabad?id=1'
    );
  });

  it('opens the new home page from the home page', () => {
    renderAt('/');
    expect(screen.getByText('Try the new design')).toHaveAttribute(
      'href',
      'https://next.sikhitothemax.org/'
    );
  });
});
