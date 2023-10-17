import FormBase from '@components/form';
import { useUpdatePost } from '@/posts/hooks';
import { redirect } from 'next/navigation';
import { Coordinate } from '@/components/map/types';
import useData from '@/components/form/useData';
import { useEffect } from 'react';
import { UpdatePostRequest } from '@/posts/types';
import DeleteButton from './deleteButton';

type Props = {
  post: UpdatePostRequest
  mapCoordinates: Coordinate
}

export default function Form({ post, mapCoordinates } : Props) {
  const { state, setData } = useData<UpdatePostRequest>(post);
  const mutation = useUpdatePost();

  const { isLoading, mutate } = mutation;

  const savePost = () => {
    if (!state.title || !state.content) return;
    mutate(state);
  };

  useEffect(() => {
    const { lat, long } = mapCoordinates;
    setData({ lat, long });
  }, [mapCoordinates, setData]);

  if (mutation.isSuccess) redirect('/posts');

  return (
    <>
      <FormBase {...{ state, setData, savePost, isLoading }} isEdit />
      <div className="mt-8" />
      <DeleteButton id={state.id} />
    </>
  );
}
