import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from 'react';
import http from '../http';
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function MapWrapper({
    center,
    style,
    zoom = 12.5,
    markers = [],
    layers = [],
    scrollWheelZoom = false,
}) {
    let attrib =
        '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="https://www.sla.gov.sg/">Singapore Land Authority</a>';

    let url = "https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png";
    const [evcList, setEVCList] = useState([]);

    useEffect(() => {
        http.get('/MyEVC').then((res) => {
            console.log(res.data);
            setEVCList(res.data);
        });
    }, []);
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    useEffect(() => {
        const fetchGeocodeData = async () => {
            const updatedEVCList = await Promise.all(
                evcList.map(async (evc) => {
                    try {
                        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(evc.address)}&apiKey=0a38c28464fe44ebbbc34aa9c8aa6280`, requestOptions);
                        const result = await response.json();
                        if (result.features && result.features.length > 0) {
                            evc.latLng = [
                                result.features[0].properties.lat,
                                result.features[0].properties.lon
                            ];
                        }
                        return evc;
                    } catch (error) {
                        console.log('error', error);
                        return evc;
                    }
                })
            );

            setEVCList(updatedEVCList);
        };

        fetchGeocodeData();
    }, [evcList]);

    markers = [];
    
    return (
        <MapContainer
            center={center}
            zoom={zoom}
            scrollWheelZoom={scrollWheelZoom}
            style={style}
        >
            <div id="map">
                <TileLayer attribution={attrib} url={url} />
            
                {evcList.map((evc, index) => (
                    evc.latLng && (
                        <Marker position={evc.latLng} key={index}>
                            <Popup><b>Name:</b> {evc.name} <br /><b>Rating:</b> {evc.rating}<FontAwesomeIcon icon={faStar} style={{ color: "orange" }} /> <br /><b>Booking rate:</b> ${evc.bookingRate}/hr <br /><button style={{backgroundColor:"white",color:"black",border:"1px solid black"}}>Book</button></Popup>
                        </Marker>
                    )
                ))}
            </div>
        </MapContainer>
    );
}

export default MapWrapper;
