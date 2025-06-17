import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import { useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { busStopIcon, userLocationIcon } from '../Utils/customMarker.js';
import StagePopup from './StagePopup.jsx';
import RoutingMachine from './Routing.jsx';
import Navigate from './Navigate.jsx';
import DirectionsDrawer from './DirectionsDrawer.jsx';
import LocationButton from './Locationbutton.jsx';

export default function Map({ stages, userLocation }) {
    const [destination, setDestination] = useState(null);
    const [selectedStop, setSelectedStop] = useState(null);
    const [directions, setDirections] = useState(null);
    const [showDrawer, setShowDrawer] = useState(false);
    const [loadingRoute, setLoadingRoute] = useState(false);

    const mapRef = useRef();

    const mapCenter = userLocation ? [userLocation.lat, userLocation.lng] : [-1.2921, 36.8219];
    const handleLocationFound = (location) => {
        if (mapRef.current) {
            mapRef.current.setView([location.lat, location.lng], 16);
        }
    };
    const handleNavigate = () => {
        if (selectedStop) {
            const [lng, lat] = selectedStop.geometry.coordinates;
            const newDestination = { lat, lng };


            if (!destination || destination.lat !== newDestination.lat || destination.lng !== newDestination.lng) {
                setDestination(newDestination);
            } else if (!showDrawer && directions) {
                setShowDrawer(true);
            }

        }
    };
    return (
        <>
            <LocationButton onLocationFound={handleLocationFound} />
            <MapContainer
                center={mapCenter}
                zoom={15}
                style={{ height: '100vh', width: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="topright" />
                {userLocation && (
                    <Marker
                        position={[userLocation.lat, userLocation.lng]}
                        icon={userLocationIcon}>
                        <Popup>My Location</Popup>
                    </Marker>
                )}
                {stages.map((stop, index) => {
                    const [lng, lat] = stop.geometry.coordinates;
                    return (
                        <Marker key={index}
                            position={[lat, lng]}
                            icon={busStopIcon}
                            eventHandlers={{
                                click: () => {
                                    if (!selectedStop || selectedStop.properties.name !== stop.properties.name) {
                                        setDestination(null);
                                    }
                                    setSelectedStop(stop);

                                }

                            }}>
                            <Popup>
                                <StagePopup stop={stop} />
                            </Popup>
                        </Marker>
                    );
                })}
                {userLocation && destination && (
                    <RoutingMachine
                        from={[userLocation.lat, userLocation.lng]}
                        to={[destination.lat, destination.lng]}
                        onRouteFound={(routeInfo) => {
                            if (!directions) { // 🔐 prevent loop
                                setLoadingRoute(false);
                                setDirections(routeInfo);
                                if (!showDrawer) setShowDrawer(true);
                            }
                        }}
                        onRoutingStart={() => setLoadingRoute(true)}
                    />
                )}


            </MapContainer>

            {
                selectedStop && (
                    <Navigate
                        onClick={handleNavigate}

                    />

                )
            }
            {showDrawer && directions && (
                <DirectionsDrawer
                    directions={directions}
                    onClose={() => {
                        setShowDrawer(false);
                        setDirections(null);
                        setDestination(null);
                    }}
                />
            )}
            {loadingRoute && (
                <div style={{
                    // position: 'absolute',
                    // top: '10px',
                    // right: '10px',
                    // background: 'white',
                    // padding: '8px 12px',
                    // borderRadius: '8px',
                    // boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    // zIndex: 1000
                }}>
                    {/* Calculating route... */}
                </div>
            )}


        </>
    );
}
