import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';

const RoutingMachine = ({ from, to }) => {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
            routeWhileDragging: true,
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map, from, to]);

    return null;
};

export default RoutingMachine;
