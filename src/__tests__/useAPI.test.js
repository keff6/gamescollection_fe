import { renderHook } from '@testing-library/react';
import useAPI from '../hooks/useAPI';

jest.mock('../hooks/useAppState', () => {
  return jest.fn(() => ({
    user: { name: 'Test User' },
  }));
});

test('useAPI hook initializes without error', () => {
  const { result } = renderHook(() => useAPI());
  expect(result.current).toHaveProperty('request');
});