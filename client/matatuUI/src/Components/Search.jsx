import { useState } from 'react';
import styles from '../Styles/Search.module.css';

export default function Search({ onHandlesubmit }) {

    const locations = [
        "Rongai",
        "Kitengela",
        "Ngong"
    ]

    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        const filtered = locations.filter(loc =>
            loc.toLowerCase().startsWith(value.toLowerCase()) && value.trim() !== ''
        );
        setSuggestions(filtered);
    }
    const handleSelect = (value) => {
        setInput(value);
        setSuggestions([]);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onHandlesubmit(input);
        }
    };

    return (

        <>

            <form
                className={styles.formContainer}
                onSubmit={handleSubmit}>
                <div
                    className={styles.searchContainer}
                >
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={input}
                        placeholder="Search Matatu Stage"
                        onChange={handleChange} />

                    <button type='submit'>
                        <img src="/searchIcon.png" alt="search button" />
                    </button>

                </div>
                {suggestions.length > 0 && (
                    <ul>
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(item)}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </form>

        </>
    )
}