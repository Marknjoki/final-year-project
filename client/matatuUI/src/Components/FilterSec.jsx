import { useState } from 'react';
import styles from '../Styles/Filter.module.css';
import FareRangeFilter from './FareRangeFilter';
export default function FilterSec({ destination }) {


    const [filters, setFilters] = useState({
        sacco: '',
        fare: 100,
    });

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
        // Optionally trigger filtering here
    };

    function handleSubmit(e) {
        e.preventDefault();
        // Submit `filters` state to backend or filter your data
        console.log(filters);
    };
    return (
        <>
            <div className={styles.formContainer}>

                <h2>Apply Filters for {destination}</h2>


                <form
                    className={styles.form}
                    onSubmit={handleSubmit}

                >
                    <input
                        className={styles.input}
                        type="text"
                        name="saccoName"
                        id="saccoName"
                        placeholder="Preferred sacco"

                        onChange={(e) => handleFilterChange('sacco', e.target.value)}
                        required

                    />


                    <FareRangeFilter fare={filters.fare} onFareChange={handleFilterChange} />

                    <button
                        className={styles.button}
                        type="submit">Apply Filter</button>
                </form>
            </div>
        </>
    )
}