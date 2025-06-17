import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Map from '../Components/Map';

export default function Stops() {
    const [stages, setStages] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        async function fetchStops() {
            try {
                const params = new URLSearchParams(location.search);
                const searchTerm = params.get('search') || '';

                const url = searchTerm
                    ? `http://localhost:4000/api/v1/stages?to=${encodeURIComponent(searchTerm)}`
                    : 'http://localhost:4000/api/v1/stages';

                const response = await fetch(url);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const data = await response.json();
                setStages(data);
            } catch (error) {
                console.error('Failed to fetch stops:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchStops();
    }, [location.search]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting user location:", error);
                }
            );
        }
    }, []);

    if (loading) return <div style={{ padding: 20, fontFamily: 'Nunito' }}>Loading map and stops...</div>;

    if (stages.length === 0)
        return <div style={{ padding: 20, fontFamily: 'Nunito' }}>No stops found matching your search.</div>;

    return (
        <div >
            <Map stages={stages} userLocation={userLocation} />

            <button
                style={{
                    padding: '10px',
                    background: 'black',
                    color: 'white',
                    borderRadius: '5px',
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    zIndex: '1000'
                }}
                onClick={() => {
                    const params = new URLSearchParams(location.search);
                    const to = params.get('search') || '';
                    if (to) {
                        window.location.href = `/routes?to=${encodeURIComponent(to)}`;
                    } else {
                        alert('Please search for a destination first.');
                    }
                }}
            >
                Show Routes
            </button>
        </div>
    );
}
