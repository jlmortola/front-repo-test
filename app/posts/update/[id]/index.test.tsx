import { render, fireEvent, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UpdatePostRequest } from '../../types';
import Form from './form';

jest.mock('../../hooks', () => ({
  useUpdatePost: () => ({
    isLoading: false,
    mutate: jest.fn(),
    isSuccess: false,
  }),
}));

jest.mock('./deleteButton', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Form', () => {
  it('renders Form and updates on change', () => {
    const post: UpdatePostRequest = {
      id: '1',
      title: '',
      content: '',
      lat: 0,
      long: 0,
      image_url: 'https://test.com/image.jpg',
    };
    const mockQueryClient = new QueryClient();
    jest.mock('react-query', () => ({
      ...jest.requireActual('react-query'),
      QueryClient: jest.fn(() => mockQueryClient),
    }));
    const mapCoordinates = { lat: 0, long: 0 };
    render(
      <QueryClientProvider client={mockQueryClient}>
        <Form post={post} mapCoordinates={mapCoordinates} />
      </QueryClientProvider>,
    );

    const titleInput = screen.getByLabelText<HTMLInputElement>('Title');
    const contentInput = screen.getByLabelText<HTMLInputElement>('Content');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    expect(titleInput.value).toBe('Test Title');
    expect(contentInput.value).toBe('Test Content');
  });
});
