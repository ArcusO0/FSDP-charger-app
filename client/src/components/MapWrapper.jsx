import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapWrapper({
    center,
    style,
    zoom = 15,
    markers = [],
    layers = [],
    scrollWheelZoom = false,
}) {
    let attrib =
        '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="https://www.sla.gov.sg/">Singapore Land Authority</a>';

    let url = "https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png";

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={scrollWheelZoom}
            style={style}
        >
            <TileLayer attribution={attrib} url={url} />
            {markers.map((marker, index) => {
                return (
                    <Marker position={marker.latLng} key={index}>
                        <Popup>{marker.message}</Popup>
                    </Marker>
                );
            })}
            {layers.map((layers) => layers)}
        </MapContainer>
    );
}

export default MapWrapper;
