import UserNavbar from "../components/userNavbar";
import MapWrapper from "../components/MapWrapper";
export default function HomePage() {
    const mapCenter = [1.3521, 103.8198]; // Latitude and longitude for the map center
    

    return (
        <>
            <MapWrapper center={mapCenter}
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
