'use client';

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import { ChangeEvent, useState } from 'react';
import uploadImage from '@/utils/uploadImage';
// import { CreatePostRequest, UpdatePostRequest } from '@/posts/types';
import { FormProps } from './types';

const inputClasses = `w-full relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-purple 
focus:border-purple transition duration-150 ease-in-out mb-4`;

const textAreaClasses = `w-full border-2 rounded-md px-4 py-2 leading-5 transition duration-150 ease-in-out sm:text-sm sm:leading-5
h-36 hover:border-purple focus:border-purple mb-4`;

export default function Form({ state, setData, isEdit, savePost, isLoading }: FormProps) {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ [e.target.name]: e.target.value });
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImageLoading(true);
      const { url } = await uploadImage(file);
      setData({ image_url: url });
      setIsImageLoading(false);
    }
  };

  const hasImage = !!state.image_url;
  const imageCta = hasImage ? 'Change image' : 'Upload an image';

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
        <input id="lat" name="lat" value={state.lat} placeholder="Latitude" readOnly className={inputClasses} />
      </label>
      <label htmlFor="long">
        Longitude
        <input id="long" name="long" value={state.long} placeholder="Longitude" readOnly className={inputClasses} />
      </label>
      {
        !hasImage ? null : (
          <>
            <p>Image</p>
            <a href={state.image_url} target="_blank" rel="noopener noreferrer">
              <img src={state.image_url} alt={state.title} className="mb-4 w-full" />
            </a>
          </>
        )
      }
      <label className="focus:border-purple relative border-2 rounded-md px-4 py-3 bg-white flex items-center justify-between hover:border-red transition duration-150 ease-in-out mb-4">
        <input id="image_url" type="file" accept="image/*" name="image_url" onChange={handleImageChange} placeholder="Image URL" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer focus:red" />
        <div className="flex items-center">
          <span className="text-sm text-gray-600">
            {
              isImageLoading ? 'Uploading image...' : imageCta
            }
          </span>
        </div>
      </label>
      <button style={{ color: 'white' }} onClick={savePost} type="submit" disabled={isLoading} className="flex text-white justify-center items-center bg-purple hover:bg-purple-dark  focus:bg-purple-dark py-2 px-4 rounded-md transition duration-300 w-full">
        {' '}
        {isEdit ? 'Update' : 'Create' }
        {' '}
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff" className="ml-4">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
        </svg>
      </button>
    </div>
  );
}
