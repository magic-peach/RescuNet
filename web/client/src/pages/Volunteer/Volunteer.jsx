import React, { useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "./Volunteer.css";

const Volunteer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    availability: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Connect to backend
    console.log("Submitting volunteer data:", formData);
    
    // Simulating API call
    setTimeout(() => {
        toast.success("Registration successful! Thank you for volunteering.");
        setFormData({
            name: "",
            email: "",
            phone: "",
            location: "",
            skills: "",
            availability: "",
        })
    }, 1000);
  };

  return (
    <>
      <Header />
      <div className="volunteer-wrapper">
        <div className="volunteer-container">
          <Card className="volunteer-card">
            <Card.Body>
              <h2 className="text-center mb-4">Join as a Volunteer</h2>
              <p className="text-center mb-4 text-muted">
                Your skills can save lives. Register today to be part of our disaster response network.
              </p>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group controlId="formName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label>Current Location (City/Area)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g., Mumbai, Andheri West"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSkills">
                  <Form.Label>Skills (Medical, Rescue, Driving, etc.)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="List your relevant skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAvailability">
                  <Form.Label>Availability</Form.Label>
                  <Form.Select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select availability</option>
                    <option value="Weekends">Weekends Only</option>
                    <option value="Full-time">Full-time (Emergency)</option>
                    <option value="On-call">On-call (24/7)</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    Register Now
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Volunteer;
