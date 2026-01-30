import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import { Container, Row, Col, Card, Accordion } from "react-bootstrap";
import "./SafetyTips.css";
import { FaFire, FaWater, FaWind, FaHouseDamage } from "react-icons/fa";

const SafetyTips = () => {
  const tips = [
    {
      title: "Earthquake Safety",
      icon: <FaHouseDamage />,
      content: [
        "Drop, Cover, and Hold On.",
        "Stay away from windows and glass.",
        "If indoors, stay there. Do not run outside.",
        "If outdoors, stay away from buildings and power lines.",
      ],
    },
    {
      title: "Flood Protocols",
      icon: <FaWater />,
      content: [
        "Move to higher ground immediately.",
        "Do not walk or drive through floodwaters.",
        "Disconnect electrical appliances.",
        "Listen to emergency broadcasts.",
      ],
    },
    {
      title: "Fire Emergency",
      icon: <FaFire />,
      content: [
        "Stop, Drop, and Roll if clothes catch fire.",
        "Crawl low under smoke.",
        "Use stairs, not elevators.",
        "Feel door handles before opening them.",
      ],
    },
    {
      title: "Cyclone/Hurricane",
      icon: <FaWind />,
      content: [
        "Secure windows and doors.",
        "Stock up on food and water.",
        "Stay indoors away from windows.",
        "Wait for official 'All Clear' before going out.",
      ],
    },
  ];

  return (
    <>
      <Header />
      <div className="safety-wrapper">
        <Container>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary-dark">Safety Tips</h1>
            <p className="lead text-muted">Learn how to protect yourself and your loved ones.</p>
          </div>
          <Row>
            {tips.map((tip, idx) => (
              <Col md={6} lg={3} className="mb-4" key={idx}>
                <Card className="h-100 safety-card">
                  <Card.Body className="text-center">
                    <div className="safety-icon mb-3">{tip.icon}</div>
                    <Card.Title className="fw-bold mb-3">{tip.title}</Card.Title>
                    <ul className="text-start safety-list">
                      {tip.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          
          <div className="mt-5">
            <h2 className="mb-4 text-center">General Preparedness Kit</h2>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>What to pack?</Accordion.Header>
                <Accordion.Body>
                  <ul>
                    <li>Water (one gallon per person per day)</li>
                    <li>Food (non-perishable)</li>
                    <li>Flashlight and extra batteries</li>
                    <li>First Aid Kit</li>
                    <li>Whistle to signal for help</li>
                    <li>Dust mask</li>
                  </ul>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default SafetyTips;
