import { UpdatePostRequest, CreatePostRequest } from '@/posts/types';
// import { Coordinate } from '../map/types';

export type FormProps = {
  state: UpdatePostRequest | CreatePostRequest
  // eslint-disable-next-line no-unused-vars
  setData: (data: Partial<UpdatePostRequest | CreatePostRequest>) => void;
  isEdit?: boolean
  savePost: () => void
  isLoading: boolean
  // eslint-disable-next-line max-len
  // postHandler: () => UseMutationResult<any, unknown, CreatePostRequest | UpdatePostRequest, { previousPost: Post | undefined; updatedPost: Post | undefined; }>;
};

export type DataProps = {
  id?: string
  title?: string
  content?: string
  lat?: number
  long?: number
  image_url?: string
  updated_at?: string
}
