'use client';

import { forwardRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Define the type for your coordinates
export default forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} style={{ width: '100%', height: '100vh' }} />
));
