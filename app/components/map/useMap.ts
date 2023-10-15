'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapHookProps, Coordinate } from './types';

export default function useMap({ showMarker, coordinates = [] }: MapHookProps) {
  const [markerCoordinates, setMarkerCoordinates] = useState<Coordinate>(coordinates[0] || [{ lat: 0, lng: 0 }]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !coordinates.length) return undefined;
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [markerCoordinates.long, markerCoordinates.lat],
      zoom: 12,
    });

    const bounds = new mapboxgl.LngLatBounds();

    coordinates?.forEach((coordinate: Coordinate) => {
      new mapboxgl.Marker()
        .setLngLat([coordinate.long, coordinate.lat])
        .addTo(map);
      // Extend the bounds to include the new marker's coordinate
      bounds.extend([coordinate.long, coordinate.lat]);
    });

    if (showMarker) {
      const marker = new mapboxgl.Marker({ draggable: true })
        .setLngLat([markerCoordinates.long, markerCoordinates.lat])
        .addTo(map);
      marker.on('dragend', () => {
        const newCoordinates = marker.getLngLat();
        setMarkerCoordinates({ long: newCoordinates.lng, lat: newCoordinates.lat });
      });
    }
    map.fitBounds(bounds, { padding: 40 });

    return () => map.remove();
  }, [showMarker]);

  return { markerCoordinates, mapContainerRef };
}
