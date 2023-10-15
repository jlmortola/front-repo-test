'use client';

import { forwardRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Define the type for your coordinates
export default forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} style={{ width: '100%', height: '100vh' }} />
));

/*
create a hook calles useMap where the map is initialized and i have a ref to use in the component i want the map to render, i have access to the coordenates, for example, i can optionally send a list of coordinates and they should render in the map, if i set the flag showMarker, then then i can drag the marker. ex: 

const { mapref, getMarkerCoordinates } = useMap({showMarker: true})
*/
