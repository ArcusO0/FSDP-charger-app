import { LayerGroup, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import bike from "../../../assets/bike.svg";

function BikeLayer({ bikes }) {
    let icon = L.icon({
        iconUrl: bike,
        iconRetinaUrl: bike,
        iconAnchor: [0, 0],
    });

    return (
        <LayerGroup>
            {bikes.map((bike) => {
                return (
                    <Marker
                        position={[bike.bikeLat, bike.bikeLon]}
                        icon={icon}
                        key={bike.bikeId}
                    >
                        <Popup>
                            {bike.bikeId}: {bike.name}
                        </Popup>
                    </Marker>
                );
            })}
            <Marker position={[1.31, 103.8]}>
                <Popup>{bike._markerMessage}</Popup>
            </Marker>
        </LayerGroup>
    );
}

export default BikeLayer;
