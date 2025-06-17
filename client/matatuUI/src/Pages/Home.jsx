import MyMap from "../Components/Map";
import SearchBar from "../Components/SearchBar";
import styles from "../Styles/HomePage.module.css";
import FilterSec from "../Components/FilterSec";
import { useState } from "react";
import RouteMap from "../Components/Map1";
export default function Homepage() {

    const [destination, setDestination] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const handleDestinationSubmit = (value) => {
        setDestination(value);
        setShowFilters(true);
    };
    return (
        <>
            <div
                className={styles.homeContainer}>
                <SearchBar onSubmitDestination={handleDestinationSubmit} />
                {showFilters && <FilterSec destination={destination} />}
                <MyMap />
                {/* <RouteMap /> */}
            </div>


        </>
    )
}