import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingBanner from '../Common/LoadingBanner/LoadingBanner.component';

test('renders loading banner message', () => {
  render(<LoadingBanner />);
  const bannerMessage = screen.getByText(/Database is launching! Please wait a little more./i);
  expect(bannerMessage).toBeInTheDocument();
});