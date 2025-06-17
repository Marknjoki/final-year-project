import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import RoutingMachine from './Routing.jsx';
import styles from '../Styles/SearchBar.module.css'

const MyMap = () => {
    const [userPosition, setUserPosition] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (err) => {
                console.error("Geolocation error:", err);
            },
            { enableHighAccuracy: true }
        );
    }, []);

    return (
        <>
            <div
                className={styles.mapContainer}
            >


                {userPosition && (

                    <MapContainer center={userPosition} zoom={13}
                        scrollWheelZoom={true}
                        zoomControl={false}
                        style={{ height: '100vh' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={userPosition}>
                            <Popup>Location</Popup>
                        </Marker>
                        {/* <RoutingMachine
                            from={userPosition}
                            to={{ lat: 1, lng: 36.5811 }} // example destination
                        /> */}
                        <ZoomControl position="topright" />
                    </MapContainer>

                )}
                {!userPosition && <p>Getting your location...</p>}
            </div>
        </>
    );
};

export default MyMap;
