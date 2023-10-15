'use client';

import { useMemo } from 'react';
import Map from '@/components/map';
import Grid from '@/components/grid';
import useMap from '@/components/map/useMap';
import Posts from './posts';
import { Post } from './types';
import { usePosts } from './hooks';

const hasCoordinates = (data: Post) => (data.lat && data.long);

export default function Content({ initialPostData }: { initialPostData: Post[] }) {
  const { isLoading, data, isError } = usePosts(initialPostData);

  // TODO: do a better check on this
  const coordinates = useMemo(() => data.filter(hasCoordinates)
    .map((post) => ({ lat: Number(post.lat), long: Number(post.long) })), [data]);
  const { mapContainerRef } = useMap({ coordinates })

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something wrong happened</p>;

  return <Grid left={<Posts posts={data} />} right={<Map ref={mapContainerRef} />} />;
}
