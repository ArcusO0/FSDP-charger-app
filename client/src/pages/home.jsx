import UserNavbar from "../components/userNavbar";
import MapWrapper from "../components/MapWrapper";
export default function HomePage() {
    

    return (
        <>
            <UserNavbar />
            <MapWrapper center={[1.3521, 103.8198]}
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