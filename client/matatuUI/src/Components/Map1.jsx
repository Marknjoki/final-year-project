import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Helper to auto-fit bounds
const FitBounds = ({ data }) => {
    const map = useMap();

    useEffect(() => {
        if (data && data.features.length > 0) {
            const layer = L.geoJSON(data);
            map.fitBounds(layer.getBounds());
        }
    }, [data, map]);

    return null;
};

const RouteMap = () => {
    const [routeData, setRouteData] = useState(null);
    const [stopsData, setStopsData] = useState(null);

    useEffect(() => {
        // Fetch route line
        fetch('http://localhost:3000/api/routes')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch route');
                return res.json();
            })
            .then(data => setRouteData(data))
            .catch(err => console.error('Route fetch error:', err));

        // Fetch stops
        fetch('http://localhost:3000/api/stops')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch stops');
                return res.json();
            })
            .then(data => setStopsData(data))
            .catch(err => console.error('Stops fetch error:', err));
    }, []);

    return (
        <MapContainer center={[-1.3, 36.8]} zoom={12} style={{ height: '100vh' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {routeData && (
                <>
                    <GeoJSON
                        data={routeData}
                        style={{ color: 'blue', weight: 3, opacity: 0.8 }}
                    />
                    <FitBounds data={routeData} />
                </>
            )}

            {stopsData && (
                <GeoJSON
                    data={stopsData}
                    pointToLayer={(feature, latlng) => L.circleMarker(latlng, {
                        radius: 6,
                        fillColor: 'red',
                        color: '#fff',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.9
                    })}
                    onEachFeature={(feature, layer) => {
                        const props = feature.properties;
                        if (props) {
                            layer.bindPopup(`<strong>${props.stop_name}</strong><br/>Route: ${props.route_name}`);
                        }
                    }}
                />
            )}
        </MapContainer>
    );
};

export default RouteMap;
