export default function StagePopup({ stop }) {

    return (
        <>

            <div>

                <h3>{stop.sacco_name}</h3>
                <p><strong>Fare (Off-Peak):</strong> KSH {stop.fare_off_peak}</p>
                <p><strong>Fare (Peak):</strong> KSH {stop.fare_on_peak}</p>
                <p><strong>Off-Peak Hours:</strong> {stop.off_peak_hours}</p>
                <p><strong>Peak Hours:</strong> {stop.peak_hours}</p>
                <p><em>{stop.comments}</em></p>

            </div>
        </>
    )
}