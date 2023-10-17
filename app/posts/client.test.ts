import { rest } from 'msw';
import { setupServer } from 'msw/node';
import client from './client';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('client', () => {
  it('should make a GET request when no data is provided', async () => {
    server.use(
      rest.get(`${process.env.NEXT_PUBLIC_API_URL}/test`, (req, res, ctx) => res(ctx.json({ message: 'Success' }))),
    );
    const result = await client('test');
    expect(result).toEqual({ message: 'Success' });
  });

  it('should make a POST request when data is provided', async () => {
    server.use(
      rest.post(`${process.env.NEXT_PUBLIC_API_URL}/test`, (req, res, ctx) => res(ctx.json({ message: 'Success' }))),
    );
    const result = await client('test', { data: { key: 'value' } });
    expect(result).toEqual({ message: 'Success' });
  });

  it('should reject with data when response is not ok', async () => {
    server.use(
      rest.post(`${process.env.NEXT_PUBLIC_API_URL}/test`, (req, res, ctx) => res(ctx.status(400), ctx.json({ message: 'Error' }))),
    );
    try {
      await client('test', { data: { key: 'value' } });
    } catch (error) {
      expect(error).toEqual({ message: 'Error' });
    }
  });
});
