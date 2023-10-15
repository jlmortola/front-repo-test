import type { UseMutationResult } from 'react-query';
import { Post } from '@/posts/types';
import { Coordinate } from '../map/types';

export type FormProps = {
  mapCoordinates: Coordinate
  post: Post
  postHandler: () => UseMutationResult
}
