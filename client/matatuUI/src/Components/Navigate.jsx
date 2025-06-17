import styles from '../Styles/Navigate.module.css';
export default function Navigate({ onClick }) {

    return (
        <>
            <div
                className={styles.btnContainer}
            >
                <p>Get Directions</p>
                <button
                    onClick={onClick}
                >
                    <img src='./route.png' alt="navigate to direction" />
                </button>
            </div>
        </>
    )
}