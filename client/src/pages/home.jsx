import UserNavbar from "../components/userNavbar";
import MapWrapper from "../components/MapWrapper";
export default function HomePage() {
    const mapCenter = [1.3521, 103.8198]; // Latitude and longitude for the map center
    const mapMarkers = [
        {
            latLng: [1.3521, 103.8198], // Latitude and longitude for the marker
            message: "This is a marker on the map.", // Popup message for the marker
        },
        // Add more markers here if needed
    ];

    return (
        <>
            <UserNavbar />
            <MapWrapper center={[1.3, 103.8]}
                scrollWheelZoom={true}
                style={{
                    position: "absolute",
                    left: "0%",
                    height: "86vh",
                    width: "100vw"
                }} />
        </>
    );
}
