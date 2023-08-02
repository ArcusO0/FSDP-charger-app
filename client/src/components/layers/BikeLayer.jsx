import { LayerGroup, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function BikeLayer({ bikes }) {
    let icon = L.icon({
        iconUrl: faLocationDot,
        iconRetinaUrl: faLocationDot,
        iconAnchor: [0, 0],
    });

    return (
        <LayerGroup>
            {charger.map((charger) => {
                return (
                    <Marker
                        position={[charger.chargerLat, charger.chargerLon]}
                        icon={icon}
                        key={charger.Id}
                    >
                        <Popup>
                            {charger.Id}: {charger.name}
                        </Popup>
                    </Marker>
                );
            })}
            <Marker position={[1.31, 103.8]}>
                <Popup>{charger._markerMessage}</Popup>
            </Marker>
        </LayerGroup>
    );
}

export default BikeLayer;
