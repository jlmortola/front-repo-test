'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapProps } from './types';

// Define the type for your coordinates

export default function Map({ coordinates = [] }: MapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !coordinates.length) return undefined;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordinates[0].long, coordinates[0].lat],
      zoom: 12,
    });

    const bounds = new mapboxgl.LngLatBounds();

    coordinates.forEach((coordinate) => {
      new mapboxgl.Marker()
        .setLngLat([coordinate.long, coordinate.lat])
        .addTo(map);
      // Extend the bounds to include the new marker's coordinate
      bounds.extend([coordinate.long, coordinate.lat]);
    });

    map.fitBounds(bounds, { padding: 40 });

    return () => map.remove();
  }, [coordinates]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }} />;
}
