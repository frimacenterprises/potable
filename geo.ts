
export const OPERATIONAL_CENTER = {
  lat: parseFloat(process.env.OPERATIONAL_LAT || "-6.7924"),
  lng: parseFloat(process.env.OPERATIONAL_LNG || "39.2083"),
};
export const OPERATIONAL_RADIUS_KM = parseFloat(process.env.OPERATIONAL_RADIUS_KM || "15");

// Haversine - elegant geo-check, never kills traffic
export function distanceKm(a: {lat:number,lng:number}, b:{lat:number,lng:number}){
  const R=6371;
  const dLat=(b.lat-a.lat)*Math.PI/180;
  const dLng=(b.lng-a.lng)*Math.PI/180;
  const lat1=a.lat*Math.PI/180, lat2=b.lat*Math.PI/180;
  const h=Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2;
  return 2*R*Math.asin(Math.sqrt(h));
}

export function checkServiceability(userPos:{lat:number,lng:number}){
  const km = distanceKm(OPERATIONAL_CENTER, userPos);
  return {
    km,
    isServiceable: km <= OPERATIONAL_RADIUS_KM,
    center: OPERATIONAL_CENTER,
    radius: OPERATIONAL_RADIUS_KM
  }
}
