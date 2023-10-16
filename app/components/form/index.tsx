'use client';

/* eslint-disable max-len */
import { ChangeEvent, useEffect } from 'react';
import uploadImage from '@/utils/uploadImage';
import { redirect } from 'next/navigation';
import useData from './useData';
import { FormProps } from './types';
import DeleteButton from './deleteButton';

const initialState = {
  title: '',
  content: '',
  lat: '',
  long: '',
  image_url: '',
};

const inputClasses = `w-full relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-purple 
focus:border-purple transition duration-150 ease-in-out mb-4`;

const textAreaClasses = `w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5
resize-none focus:outline-none focus:border-purple mb-4`;

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

  const hasImage = !!state.image_url;

  return (
    <div className="text-black">
      <label htmlFor="title">
        Title
        <input id="title" name="title" value={state.title} onChange={handleChange} placeholder="Title" aria-label="Title" className={inputClasses} />
      </label>
      <label htmlFor="content">
        Content
        <textarea id="content" name="content" value={state.content} onChange={handleChange} placeholder="Content" className={textAreaClasses} />
      </label>
      <label htmlFor="lat">
        Latitude
        <input id="lat" name="lat" value={state.lat} onChange={handleChange} placeholder="Latitude" readOnly className={inputClasses} />
      </label>
      <label htmlFor="long">
        Longitude
        <input id="long" name="long" value={state.long} onChange={handleChange} placeholder="Longitude" readOnly className={inputClasses} />
      </label>
      {
        !hasImage ? null : (
          <>
            <p>Image</p>
            <a href={state.image_url} target="_blank" rel="noopener noreferrer">
              <img src={state.image_url} alt={state.title} className="mb-4" />
            </a>
          </>
        )
      }
      <label className="focus:border-purple relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-red transition duration-150 ease-in-out mb-4">
        <input id="image_url" type="file" accept="image/*" name="image_url" onChange={handleImageChange} placeholder="Image URL" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus:red" />
        <div className="flex items-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          <span className="ml-2 text-sm text-gray-600">{hasImage ? 'Change image' : 'Upload an image'}</span>
        </div>
      </label>
      <button style={{ color: 'white' }} onClick={savePost} type="submit" disabled={mutation.isLoading} className="flex text-white justify-center items-center bg-purple hover:bg-purple-dark  focus:bg-purple-dark py-2 px-4 rounded-md transition duration-300 gap-2"> {isEdit ? 'Update' : 'Create' }
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff">
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
        </svg>
      </button>
      {
        isEdit ? <DeleteButton id={state.id} /> : null
      }
    </div>
  );
}
