import { useSearchParams } from "react-router-dom";
import RouteMap from "../Components/RouteMap";

export default function Routes() {
    const [searchParams] = useSearchParams();
    const to = searchParams.get("to");

    return (
        <div style={

            {
                fontFamily: 'Nunito',
            }
        }>
            <h2>Route and stops to {to}</h2>
            <RouteMap to={to} />
        </div>
    );
}
