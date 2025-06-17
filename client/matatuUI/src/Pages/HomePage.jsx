import styles from "../Styles/HomePage.module.css";
import { useNavigate } from "react-router-dom";
import Search from "../Components/Search";

export default function Homepage() {
    const navigate = useNavigate();

    const handleSearch = (destination) => {

        navigate(`/stops?search=${encodeURIComponent(destination)}`);
    };

    return (
        <div className={styles.page}>
            {/* Top Section */}
            <div className={styles.heroSection}>
                <h1>Find Matatus Near You</h1>
                <p>Discover Routes, Stages & More</p>

                <div className={styles.mapCard}>

                    <Search onHandlesubmit={handleSearch} />
                </div>
            </div>


            <div className={styles.howItWorks}>
                <h2>How It Works</h2>
                <div className={styles.steps}>
                    <div>
                        <img src="./map.png" alt="" srcset="" /><p>Detect Location</p></div>
                    <div>
                        <img src="./bus1.png" alt="" srcset="" /> <p>Choose a Matatu</p></div>
                    <div>
                        <img src="./route2.png" alt="" srcset="" /><p> See the Route</p></div>
                </div>
            </div>


            <div className={styles.features}>
                <h2>Key Features</h2>
                <div className={styles.featureList}>
                    <div className={styles.featureItem}>
                        <span className={styles.checkmark}>✔</span>
                        <span>Real-time location detection</span>
                    </div>
                    <div className={styles.featureItem}>
                        <span className={styles.checkmark}>✔</span>
                        <span>Stage and sacco details</span>
                    </div>
                    <div className={styles.featureItem}>
                        <span className={styles.checkmark}>✔</span>
                        <span>Route re-visualization</span>
                    </div>
                    <div className={styles.featureItem}>
                        <span className={styles.checkmark}>✔</span>
                        <span>Stage and sacco data</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
