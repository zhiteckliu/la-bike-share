export type LongLat = {
  long: number,
  lat: number
}

export function getRegionForCoordinates(points: LongLat[]) {
  let minX, maxX, minY, maxY

  points.map(point => {
    minX = Math.min(minX || points[0].lat, point.lat);
    maxX = Math.max(maxX || points[0].lat, point.lat);
    minY = Math.min(minY || points[0].long, point.long);
    maxY = Math.max(maxY || points[0].long, point.long);
  })

  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = (maxX - minX) * 1.2;
  const deltaY = (maxY - minY) * 1.2;

  return {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY
  };
}