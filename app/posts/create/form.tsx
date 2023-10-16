import FormBase from '@components/form';
import { useCreatePost } from '@/posts/hooks';
import { redirect } from 'next/navigation';
import { Coordinate } from '@/components/map/types';
import useData from '@/components/form/useData';
import { useEffect } from 'react';
import { CreatePostRequest } from '@/posts/types';

type Props = {
  mapCoordinates: Coordinate
}

const initialState = {
  title: '',
  content: '',
  image_url: '',
};

export default function Form({ mapCoordinates } : Props) {
  const { state, setData } = useData<CreatePostRequest>(initialState);
  const mutation = useCreatePost();

  const { isLoading, mutate } = mutation;

  const savePost = () => {
    mutate(state);
  };

  useEffect(() => {
    const { lat, long } = mapCoordinates;
    setData({ lat, long });
  }, [mapCoordinates, setData]);

  if (mutation.isSuccess) redirect('/posts');

  return (
    <FormBase {...{ state, setData, savePost, isLoading }} />
  );
}
