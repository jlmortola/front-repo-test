'use client';

import { ChangeEvent, useEffect } from 'react';
import uploadImage from '@/utils/uploadImage';
import useData from './useData';
import { FormProps } from './types';
import DeleteButton from './deleteButton';
import { redirect } from 'next/navigation';

const initialState = {
  title: '',
  content: '',
  lat: 0,
  long: 0,
  image_url: '',
};

export default function Form({ mapCoordinates, post, postHandler }: FormProps) {
  const { state, setData } = useData(post || initialState);
  const mutation = postHandler();
  const isEdit = !!post;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ [e.target.name]: e.target.value });
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const { url } = await uploadImage(file);
      setData({ image_url: url });
    }
  };

  const savePost = () => {
    mutation.mutate(state);
  };

  useEffect(() => {
    const { lat, long } = mapCoordinates;
    setData({ lat, long });
  }, [mapCoordinates, setData]);

  if (mutation.isSuccess) redirect('/posts');

  return (
    <div className="text-black">
      <label htmlFor="title">
        Title
        <input id="title" name="title" value={state.title} onChange={handleChange} placeholder="Title" aria-label="Title" />
      </label>
      <label htmlFor="content">
        Content
        <textarea id="content" name="content" value={state.content} onChange={handleChange} placeholder="Content" />
      </label>
      <label htmlFor="lat">
        Latitude
        <input id="lat" name="lat" value={state.lat} onChange={handleChange} placeholder="Latitude" readOnly />
      </label>
      <label htmlFor="long">
        Longitude
        <input id="long" name="long" value={state.long} onChange={handleChange} placeholder="Longitude" readOnly />
      </label>
      <label htmlFor="image_url">
        Click to upload an image
        {
          !state.image_url ? null : <img src={state.image_url} alt={state.title} />
        }
        <input id="image_url" type="file" accept="image/*" name="image_url" onChange={handleImageChange} placeholder="Image URL" className='hidden' />
      </label>
      <button onClick={savePost}>{isEdit ? 'Update' : 'Create' }</button>
      {
        isEdit ? <DeleteButton id={state.id} /> : null
      }
    </div>
  );
}
