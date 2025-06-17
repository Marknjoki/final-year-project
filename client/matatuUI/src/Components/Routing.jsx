import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useMap } from 'react-leaflet';

const RoutingMachine = ({ from, to, onRouteFound, onRoutingStart }) => {

    const map = useMap();
    const controlRef = useRef(null);

    useEffect(() => {
        if (!map || !from || !to || !from[0] || !to[0]) return;

        if (controlRef.current) {
            try {
                map.removeControl(controlRef.current);
            } catch (err) {
                console.warn("Error removing routing control:", err);
            }
            controlRef.current = null;
        }

        if (onRoutingStart) onRoutingStart();

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            show: false,
            lineOptions: {
                styles: [{ color: 'blue', opacity: 1, weight: 3.5 }],
            },
            createMarker: () => null,
            router: L.Routing.mapbox('pk.eyJ1IjoibWFya25qb2tpNyIsImEiOiJjbWJxNHh5ZnkwMDJvMmxzOXZtYmZzcXJxIn0.0I9sUeefxlZUknwwq7UbRw')
        }).addTo(map);

        controlRef.current = routingControl;

        routingControl.on('routesfound', (e) => {
            const route = e.routes[0];
            const summary = route.summary;
            const steps = route.instructions?.map(i =>
                `${i.text} (${(i.distance / 1000).toFixed(2)} km)`
            ) || [];

            onRouteFound?.({
                distance: (summary.totalDistance / 1000).toFixed(1) + " km",
                duration: Math.round(summary.totalTime / 60) + " min",
                steps,
            });
        });

        routingControl.on('routingerror', (err) => {
            console.error('Routing error:', err);
        });

        return () => {
            if (controlRef.current) {
                try {
                    map.removeControl(controlRef.current);
                } catch (err) {
                    console.warn("Error cleaning up control:", err);
                }
                controlRef.current = null;
            }
        };
    }, [from, to, map, onRouteFound, onRoutingStart]);

    return null;

};

export default RoutingMachine;
