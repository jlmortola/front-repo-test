export type Coordinate = {
  lat: number;
  long: number;
}

export type MapProps = {
}

export type MapHookProps = {
  showMarker: boolean
  coordinates: Coordinate[]
}
