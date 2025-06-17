import L from 'leaflet';

export const userLocationIcon = new L.Icon({
    iconUrl: '/gps.png',
    iconSize: [36, 36],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

export const busStopIcon = new L.Icon({
    iconUrl: '/bus-stop.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});


export const stopRoutesIcon = new L.Icon({
    iconUrl: '/bus.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});
