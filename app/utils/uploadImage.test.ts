import { rest } from 'msw';
import { setupServer } from 'msw/node';
import uploadImage from './uploadImage';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('uploadImage', () => {
  it('should resolve with response data when image upload is successful', async () => {
    const mockResponse = { url: 'http://example.com/image.jpg' };
    server.use(
      rest.post('/api/upload', (req, res, ctx) => res(ctx.json(mockResponse))),
    );

    const file = new File([''], 'filename', { type: 'image/jpeg' });
    const result = await uploadImage(file);

    expect(result).toEqual(mockResponse);
  });

  it('should reject with error when image upload fails', async () => {
    server.use(
      rest.post('/api/upload', (req, res, ctx) => res(ctx.status(500))),
    );

    const file = new File([''], 'filename', { type: 'image/jpeg' });

    await expect(uploadImage(file)).rejects.toThrow('Image upload failed');
  });
});
