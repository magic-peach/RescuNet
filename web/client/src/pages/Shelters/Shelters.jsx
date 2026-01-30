import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import { Container } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Shelters = () => {
  const [shelters, setShelters] = useState([
    { id: 1, name: "City Community Hall", lat: 19.0760, lng: 72.8777, capacity: 200, status: "Open" }, // Mumbai
    { id: 2, name: "St. Xavier's School", lat: 28.6139, lng: 77.2090, capacity: 500, status: "Full" }, // Delhi
    { id: 3, name: "Central Stadium", lat: 13.0827, lng: 80.2707, capacity: 1000, status: "Open" }, // Chennai
  ]);

  return (
    <>
      <Header />
      <div style={{ position: "relative", height: "calc(100vh - 70px)" }}>
        <MapContainer 
            center={[20.5937, 78.9629]} 
            zoom={5} 
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {shelters.map(shelter => (
                <Marker key={shelter.id} position={[shelter.lat, shelter.lng]}>
                    <Popup>
                        <strong>{shelter.name}</strong><br />
                        Capacity: {shelter.capacity}<br />
                        Status: <span style={{ color: shelter.status === "Open" ? "green" : "red"}}>{shelter.status}</span>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
        
        <div style={{ 
            position: "absolute", 
            top: "20px", 
            left: "60px", 
            zIndex: 1000, 
            background: "white", 
            padding: "15px", 
            borderRadius: "8px", 
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
        }}>
            <h4 style={{ margin: 0, color: "#2B3674" }}>Safe Zones & Shelters</h4>
            <p className="mb-0 text-muted">Find nearest relief camps</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shelters;
