import UserNavbar from "../components/userNavbar";
import MapWrapper from "../components/MapWrapper";
export default function HomePage() {
    

    return (
        <div style={{}}>
        
            <UserNavbar />
            <MapWrapper center={[1.3521, 103.8198]}
                scrollWheelZoom={true}
                style={{
                    position: "absolute",
                    left: "0%",
                    bottom:"0%",
                    height: "86vh",
                    width: "100vw"
                }} />
                
            </div>
        
    );
}
