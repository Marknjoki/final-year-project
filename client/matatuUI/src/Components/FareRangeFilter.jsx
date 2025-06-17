
import '../Styles/FareRangeFilter.css';

export default function FareRangeFilter({ fare, onFareChange }) {

    const min = 10;
    const max = 200;


    const percent = ((fare - min) / (max - min)) * 100;

    return (
        <div className="range-container">
            <label htmlFor="fareRange">Max Fare (KES)</label>
            <div className="range-wrapper">
                <input
                    type="range"
                    id="fareRange"
                    min="0"
                    max="200"
                    step="10"
                    value={fare}
                    onChange={(e) => onFareChange('fare', Number(e.target.value))}
                />
                <div className="bubble"
                    style={{ left: `${percent}%` }}
                >
                    KES {fare}
                </div>
            </div>
        </div>
    );
}

