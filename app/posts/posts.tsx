'use client';

import Link from 'next/link';
import { Post } from './types';

export default function Posts({ posts }: {posts: Post[]}) {
  return (
    <div>
      {
        posts.map((post) => (
          <Link href={`/posts/update/${post.id}`}>
            <div key={post.id}>
              <p>
                id:
                {' '}
                {post.id}
              </p>
              <p>
                title:
                {' '}
                {post.title}
              </p>
              <p>
                title:
                {' '}
                {post.content}
              </p>
              <p>
                <span>
                  Latitude:
                  {' '}
                  {post.lat}
                </span>
                <span>
                  Longitude:
                  {' '}
                  {post.long}
                </span>

              </p>
              <p>
                {post.image_url}
              </p>
              <p>
                {post.content}
              </p>
            </div>
          </Link>
        ))
      }
    </div>
  );
}
