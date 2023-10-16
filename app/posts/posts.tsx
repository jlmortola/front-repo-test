'use client';

/* eslint-disable max-len */

import Link from 'next/link';
import { Post } from './types';

export default function Posts({ posts }: {posts: Post[]}) {
  return (
    <div>
      <Link href="/posts/create" style={{ color: 'white' }} className="mb-8 flex text-white justify-center items-center bg-purple hover:bg-purple-dark  focus:bg-purple-dark py-2 px-4 rounded-md transition duration-300 w-full">
        Create new incident
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" id="send" fill="#fff" className="ml-4">
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
        </svg>
      </Link>
      {
        posts.map((post) => (
          <Link key={post.id} href={`/posts/update/${post.id}`}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mb-6">
              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                  {post.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {post.content}
                </p>
              </div>
              <img className="rounded-b-lg" src={post.image_url} alt={post.title} />
            </div>
          </Link>
        ))
      }
    </div>
  );
}
