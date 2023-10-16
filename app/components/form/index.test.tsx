import { render, fireEvent, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Form from './index';

test('renders Form and updates on change', () => {
  const postHandlerMock = jest.fn().mockImplementation(() => ({
    isSuccess: false,
    mutate: jest.fn(),
  }));
  jest.mock('next/navigation');
  const mockQueryClient = new QueryClient();
  jest.mock('react-query', () => ({
    ...jest.requireActual('react-query'),
    QueryClient: jest.fn(() => mockQueryClient),
  }));
  const mapCoordinates = { lat: 0, long: 0 };
  const post = {
    id: '',
    title: '',
    content: '',
    lat: '',
    long: '',
    image_url: '',
  };

  render(
    <QueryClientProvider client={mockQueryClient}>
      <Form mapCoordinates={mapCoordinates} post={post} postHandler={postHandlerMock} />
    </QueryClientProvider>,
  );

  const titleInput = screen.getByLabelText<HTMLInputElement>('Title');
  const contentInput = screen.getByLabelText<HTMLInputElement>('Content');

  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  fireEvent.change(contentInput, { target: { value: 'Test Content' } });

  expect(titleInput.value).toBe('Test Title');
  expect(contentInput.value).toBe('Test Content');
});
