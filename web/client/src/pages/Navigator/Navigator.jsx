import Header from "../../components/header/header";
import Footer from "../../components/footer/Footer";
import dashboard from "../../assets/rb_2552 1.png";
import verf from "../../assets/rb_2385 1.png";
import pig from "../../assets/1988196_256429-P4R90V-522 1.png";
import "./Navigator.css";
import { Link } from "react-router-dom";

// Reusing assets for now to ensure no broken images
const images = [
  {
    src: verf,
    alt: "Search Posts",
    label: "Search Posts",
    link: "/dashboard/search",
  },
  {
    src: dashboard,
    alt: "Dashboard",
    label: "Dashboard",
    link: "/dashboard/analytics",
  },
  {
    src: pig,
    alt: "Donations",
    label: "Donations",
    link: "/dashboard/donations",
  },
  {
    src: dashboard, // Reusing
    alt: "Volunteer",
    label: "Volunteer",
    link: "/volunteer",
  },
  {
    src: verf, // Reusing
    alt: "Safety Tips",
    label: "Safety Tips",
    link: "/safety-tips",
  },
  {
    src: pig, // Reusing
    alt: "Emergency Contacts",
    label: "Contacts",
    link: "/contacts",
  },
  {
    src: dashboard, // Reusing
    alt: "Resources",
    label: "Resources",
    link: "/resources",
  },
  {
    src: verf, // Reusing
    alt: "Shelters",
    label: "Shelters",
    link: "/shelters",
  },
];

const Navigator = () => {
  return (
    <>
      <Header />
      <div className="container-large">
        <div className="container">
          {images.map((image, index) => (
            <Link to={image.link} key={index} className="nav-card">
              <div className="nav-image">
                <img src={image.src} alt={image.alt} draggable="false" />
              </div>
              <div className="nav-link">{image.label}</div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Navigator;
