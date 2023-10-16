import type { UseMutationResult } from 'react-query';
import { Post } from '@/posts/types';
import { Coordinate } from '../map/types';

export type FormProps = {
  mapCoordinates: Coordinate
  post?: Post
  postHandler: () => UseMutationResult
}

export type DataProps = {
  id?: string
  title?: string
  content?: string
  lat?: number
  long?: number
  image_url?: string
  updated_at?: string
}
