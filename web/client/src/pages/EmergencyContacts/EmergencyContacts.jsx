import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import { Container, Table, Button, Badge } from "react-bootstrap";
import { FaPhoneAlt } from "react-icons/fa";

const EmergencyContacts = () => {
  const contacts = [
    { name: "National Emergency Number", number: "112", category: "General" },
    { name: "Police", number: "100", category: "Police" },
    { name: "Fire", number: "101", category: "Fire" },
    { name: "Ambulance", number: "102", category: "Medical" },
    { name: "Disaster Management Services", number: "108", category: "Disaster" },
    { name: "Women Helpline", number: "1091", category: "Help" },
    { name: "Air Ambulance", number: "9540161344", category: "Medical" },
    { name: "Earthquake / Flood / Disaster", number: "011-24363260", category: "Disaster" },
  ];

  return (
    <>
      <Header />
      <div style={{ padding: "60px 0", background: "#f8f9fa", minHeight: "80vh" }}>
        <Container>
            <div className="text-center mb-5">
                <h1 className="fw-bold" style={{ color: "#2B3674" }}>Emergency Contacts</h1>
                <p className="text-muted">Keep these numbers handy. Tap to call on mobile.</p>
            </div>
            
            <div className="bg-white p-4 rounded shadow-sm">
                <Table responsive hover borderless>
                    <thead style={{ background: "#2B3674", color: "white" }}>
                        <tr>
                            <th className="py-3 ps-4">Service Name</th>
                            <th className="py-3">Category</th>
                            <th className="py-3 text-end pe-4">Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, idx) => (
                            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                                <td className="py-3 ps-4 fw-bold">{contact.name}</td>
                                <td className="py-3">
                                    <Badge bg={contact.category === 'General' ? 'danger' : 'secondary'}>
                                        {contact.category}
                                    </Badge>
                                </td>
                                <td className="py-3 text-end pe-4">
                                    <Button href={`tel:${contact.number}`} variant="outline-primary" size="sm" className="d-flex align-items-center justify-content-center ms-auto gap-2">
                                        <FaPhoneAlt size={12}/> {contact.number}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default EmergencyContacts;
