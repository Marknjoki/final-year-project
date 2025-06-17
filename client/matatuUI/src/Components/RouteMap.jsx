import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-polylinedecorator';
import { stopRoutesIcon } from '../Utils/customMarker.js';

const RouteMap = ({ to }) => {
    const [routeData, setRouteData] = useState(null);
    const [stopsData, setStopsData] = useState(null);
    const mapRef = useRef();

    useEffect(() => {
        if (!to || to.trim() === "") {
            setRouteData(null);
            setStopsData(null);
            return;
        }
        const routeUrl = `http://localhost:4000/api/v1/routes?to=${(to)}`;

        fetch(routeUrl)
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch route');
                return res.json();
            })
            .then(data => {
                setRouteData(data);

                fetch(`http://localhost:4000/api/v1/stops?route=${(to)}`)
                    .then(res => res.json())
                    .then(setStopsData)
                    .catch(err => console.error('Stops fetch error:', err));
            })
            .catch(err => console.error('Route fetch error:', err));
    }, [to]);

    return (
        <MapContainer
            center={[-1.3, 36.8]}
            zoom={15}
            style={{ height: '100vh' }}
            whenCreated={mapInstance => (mapRef.current = mapInstance)}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {routeData && Array.isArray(routeData) && routeData.map((route, index) => (
                <GeoJSON
                    key={index}
                    data={route}
                    style={{ color: 'blue', weight: 3, opacity: 0.8 }}
                    onEachFeature={(feature, layer) => {
                        const direction = feature.properties.reverse_cost === -1 ? 'oneway' : 'twoway';

                        layer.setStyle({
                            dashArray: direction === 'twoway' ? '5, 10' : null,
                            color: 'blue',
                            weight: 3,
                            opacity: 0.8
                        });

                        const coords = feature.geometry.coordinates;
                        const latlngs = coords.map(coord => [coord[1], coord[0]]);

                        if (mapRef.current && latlngs.length > 1) {
                            const arrowDecorator = L.polylineDecorator(L.polyline(latlngs), {
                                patterns: [
                                    {
                                        offset: '50%',
                                        repeat: 0,
                                        symbol: L.Symbol.arrowHead({
                                            pixelSize: 10,
                                            polygon: false,
                                            pathOptions: { color: '#000', weight: 2 }
                                        })
                                    }
                                ]
                            });

                            arrowDecorator.addTo(mapRef.current);
                        }


                        layer.bindPopup(`<strong>${feature.properties.route_name}</strong><br/>From: ${feature.properties.from_stop}<br/>To: ${feature.properties.to_stop}`);
                    }}
                />
            ))}


            {stopsData && stopsData.features.length > 0 && (
                <GeoJSON
                    data={stopsData}
                    pointToLayer={(feature, latlng) => {
                        return L.marker(latlng, {
                            icon: stopRoutesIcon
                        });
                    }}
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
