export const getStagesQuery = `
  SELECT 
    sacco_name,
    fare_off_peak,
    fare_on_peak,
    peak_hours,
    off_peak_hours,
    comments,
    ST_AsGeoJSON(ST_Transform(geom, 4326))::json AS geometry
  FROM cbd_matatu_stops 
  WHERE route = $1
`;
