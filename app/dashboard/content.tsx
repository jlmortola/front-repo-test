'use client';

import { useMemo } from 'react';
import Map from '@/components/map';
import Posts from './posts';
import { Post } from './types';
import { usePosts } from './hooks';

export default function Content({ initialPostData }: { initialPostData: Post[] }) {
  const { isLoading, data, isError } = usePosts(initialPostData);

  const coordinates = useMemo(() => data.map((post) => ({ lat: Number(post.lat), long: Number(post.long) })), [data]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something wrong happened</p>;

  return (
    <section className="flex">
      <aside className="w-2/5">
      <h2>Sidebar</h2>
        <Posts posts={data} />
      </aside>
      <section className="w-full">
        <Map coordinates={coordinates} />
      </section>
    </section>
  );
}
