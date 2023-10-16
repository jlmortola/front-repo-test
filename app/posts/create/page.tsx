'use client';

import Grid from '@/components/grid';
import Map from '@/components/map';
import useMap from '@/components/map/useMap';

import Form from './form';

const DEFAULT_COORDS_BCN_COORDS = {
  lat: 41.387742865889905,
  long: 2.1701659004313782,
};

export default function CreatePost() {
  const { markerCoordinates, mapContainerRef } = useMap({ showMarker: true, coordinates: [DEFAULT_COORDS_BCN_COORDS] });
  return (
    <Grid
      left={<Form mapCoordinates={markerCoordinates} />}
      right={<Map ref={mapContainerRef} />}
    />
  );
}
