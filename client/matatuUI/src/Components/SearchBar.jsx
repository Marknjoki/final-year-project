import { useState } from "react";
import styles from "../Styles/SearchBar.module.css";
export default function SearchBar({ onSubmitDestination }) {

    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onSubmitDestination(input);
        }
    };

    return (


        <form
            className={styles.searchContainer}
            onSubmit={handleSubmit}>

            <div className={styles.inputContainer}>
                <button
                    type="submit">

                    <img
                        className={styles.searchImg}
                        src="searchIcon.png" /></button>
                <input
                    className={styles.searchInput}
                    type="search"
                    placeholder="From"
                    name="from"
                    id="from"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required />

            </div>


            <div className={styles.inputContainer}>
                <button
                    type="submit">

                    <img
                        className={styles.searchImg}
                        src="searchIcon.png" /></button>
                <input
                    className={styles.searchInput}
                    type="search"
                    placeholder="enter destination"
                    name="destination"
                    id="destination"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    required />


            </div>


        </form>
    )


}