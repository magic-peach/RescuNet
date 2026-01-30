import React, { useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import { Container, Row, Col, Card, Form, Button, Badge } from "react-bootstrap";

const ResourceRequests = () => {
    const [requests, setRequests] = useState([
        { id: 1, type: "Food", location: "Mumbai, Bandra", status: "Urgent", description: "Need food packets for 50 people stranded." },
        { id: 2, type: "Medicine", location: "Delhi, Rohini", status: "Active", description: "Insulin required urgently." },
    ]);

    const [form, setForm] = useState({
        type: "Food",
        location: "",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newReq = {
            id: requests.length + 1,
            type: form.type,
            location: form.location,
            status: "Active",
            description: form.description
        };
        setRequests([newReq, ...requests]);
        setForm({ type: "Food", location: "", description: "" });
        alert("Request added successfully!");
    };

    return (
        <>
            <Header />
            <Container className="py-5">
                <h1 className="text-center mb-5 fw-bold" style={{ color: "#2B3674" }}>Resource Requests</h1>
                <Row>
                    <Col md={4} className="mb-4">
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <Card.Title className="mb-4">Request Aid</Card.Title>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Resource Type</Form.Label>
                                        <Form.Select 
                                            value={form.type} 
                                            onChange={(e) => setForm({...form, type: e.target.value})}
                                        >
                                            <option>Food</option>
                                            <option>Water</option>
                                            <option>Medicine</option>
                                            <option>Shelter</option>
                                            <option>Clothing</option>
                                            <option>Other</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            placeholder="Your location" 
                                            required 
                                            value={form.location}
                                            onChange={(e) => setForm({...form, location: e.target.value})}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3} 
                                            placeholder="Details..." 
                                            required 
                                            value={form.description}
                                            onChange={(e) => setForm({...form, description: e.target.value})}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100" style={{ background: "#2B3674" }}>
                                        Submit Request
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={8}>
                        <h4 className="mb-3">Recent Requests</h4>
                        {requests.map(req => (
                            <Card key={req.id} className="mb-3 shadow-sm border-0">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h5>
                                                {req.type} 
                                                <Badge bg={req.status === 'Urgent' ? 'danger' : 'success'} className="ms-2" style={{ fontSize: '0.7em'}}>
                                                    {req.status}
                                                </Badge>
                                            </h5>
                                            <p className="text-muted mb-1"><small>{req.location}</small></p>
                                            <p className="mb-0">{req.description}</p>
                                        </div>
                                        <Button variant="outline-primary" size="sm">Offer Help</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default ResourceRequests;
