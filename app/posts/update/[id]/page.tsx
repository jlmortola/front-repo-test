'use client';

import Grid from '@/components/grid';
import Map from '@/components/map';
import useMap from '@/components/map/useMap';
import { usePost } from '@/posts/hooks';
import { UpdatePostRequest } from '@/posts/types';
import Form from './form';

function Content({ post }: { post: UpdatePostRequest }) {
  const coordinates = [{ lat: Number(post.lat), long: Number(post.long) }];
  const { markerCoordinates, mapContainerRef } = useMap({ showMarker: true, coordinates });

  return (
    <Grid
      left={<Form post={post} mapCoordinates={markerCoordinates} />}
      right={<Map ref={mapContainerRef} />}
    />
  );
}

export default function UpdatePost({ params }: { params: { id: string } }) {
  const { id } = params;
  const { isLoading, data, isError } = usePost(id);
  if (isLoading) return 'is loading';
  if (isError) return 'Something wrong happened';

  return <Content post={data as UpdatePostRequest} />;
}
