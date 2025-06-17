export default function DirectionsDrawer({ directions, onClose }) {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'white',
            fontFamily: 'Nunito',
            padding: '1rem',
            borderTop: '2px solid #ccc',
            maxHeight: '40vh',
            overflowY: 'auto',
            boxShadow: '0 -2px 10px rgba(0,0,0,0.3)',
            zIndex: 1000
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>Route Info</span>
                <button onClick={onClose}>X</button>
            </div>
            <p><strong>Distance:</strong> {directions.distance}</p>
            <p><strong>Duration:</strong> {directions.duration}</p>
            <ol>
                {directions.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                ))}
            </ol>
        </div>
    );
}
