import { useState } from 'react';
import styles from '../Styles/Locationbtn.module.css'
export default function LocationButton({ onLocationFound }) {

    const [locationSet, setLocationSet] = useState(false);

    const handleClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    onLocationFound({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLocationSet(true)
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to access your location.");
                },
                { enableHighAccuracy: true }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <>
            <div className={styles.btnContainer}>

                {!locationSet && <p>Use My Location</p>}
                {locationSet && <p>Live Location In Use</p>}
                <button onClick={handleClick}>
                    <img src={locationSet ? "/location_on.png" : "/location_off.png"}
                        alt="" />

                </button>
            </div>
        </>
    );
}
