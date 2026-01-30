import { Route, Routes, useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Home from "./pages/Home/Home";
import "leaflet/dist/leaflet.css";
import ElasticSearch from "./pages/ElasticSearch/ElasticSearch";
import VerifyPosts from "./pages/VerifyPosts/VerifyPosts";
import Donation from "./pages/Donation/Donation";
import SummarizePosts from "./pages/SummarizePosts/SummarizePosts";
import Dashboard from "./pages/Dashboard/Dashboard";
import Navigator from "./pages/Navigator/Navigator";
import Realtime from "./pages/Realtime/Realtime";
import HomeDash from "./pages/HomeDash/HomeDash";

// New Feature Imports
import Volunteer from "./pages/Volunteer/Volunteer";
import SafetyTips from "./pages/SafetyTips/SafetyTips";
import EmergencyContacts from "./pages/EmergencyContacts/EmergencyContacts";
import ResourceRequests from "./pages/ResourceRequest/ResourceRequests";
import Shelters from "./pages/Shelters/Shelters";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        {/* Existing Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:tab" element={<Dashboard />} />
        <Route path="/donations/:fundraiserId" element={<Donation />} />
        <Route path="/elastic" element={<ElasticSearch />} />
        <Route path="/verifyposts" element={<VerifyPosts />} />
        <Route path="/summarizeposts" element={<SummarizePosts />} />
        <Route path="/navigation" element={<Navigator />} />
        <Route path="/realtime" element={<Realtime />} />
        <Route path="/home" element={<HomeDash />} />

        {/* New Feature Routes */}
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/safety-tips" element={<SafetyTips />} />
        <Route path="/contacts" element={<EmergencyContacts />} />
        <Route path="/resources" element={<ResourceRequests />} />
        <Route path="/shelters" element={<Shelters />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Slide}
      />
    </>
  );
}

export default App;
