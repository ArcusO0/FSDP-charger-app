import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useRef, useMemo } from "react";
import "leaflet/dist/leaflet.css";

function LocationPicker({
    selectedPos,
    setSelectedPosState,
    style,
    zoom = 15,
    markers = [],
    scrollWheelZoom = false,
}) {
    let attrib =
        '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="https://www.sla.gov.sg/">Singapore Land Authority</a>';

    let url = "https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png";

    const markerRef = useRef(null);

    let eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setSelectedPosState(marker.getLatLng());
                }
            },
        }),
        []
    );
    

    return (
        <MapContainer
            center={selectedPos}
            zoom={zoom}
            scrollWheelZoom={scrollWheelZoom}
            style={style}
        >
            <TileLayer attribution={attrib} url={url} />
            <Marker
                draggable={true}
                position={selectedPos}
                eventHandlers={eventHandlers}
                ref={markerRef}
            />
        </MapContainer>
    );
}

export default LocationPicker;
