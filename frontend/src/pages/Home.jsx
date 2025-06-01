// import React from 'react'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Inside App component:

// const Home = () => {
//   return (
//     <div>Home<ToastContainer position="top-right" /></div>
//   )
// }

// export default Home
import LandTable from "../components/LandTable";
import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import {
 getLandBySellerId,
  deleteLand,
  getAllLands ,
} from "../utils/api";

const Home = () => {
  const userId = localStorage.getItem("userid");
  const username = localStorage.getItem("username");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [salersLand, setSalersLand] = useState([]);
  const [appliedLands, setAppliedLands] = useState([]);
  const [allLands, setAllLands] = useState([]);
  const fetchAllLands = async () => {
  try {
    const res = await getAllLands();
    setAllLands(res.data);
  } catch (err) {
    console.error("Failed to fetch all lands", err);
  }
};  const fetchSalerLands = async () => {
    try {
      const res = await getLandBySellerId(userId);
      setSalersLand(res.data);
    } catch (err) {
      console.error("Failed to fetch saler lands", err);
    }
  };

  const fetchAppliedLands = async () => {
    try {
      const res = await getAllLands ();
      const applied = res.data.filter((land) =>
        land.applyers.some((applyer) => applyer._id === userId)
      );
      setAppliedLands(applied);
    } catch (err) {
      console.error("Failed to fetch applied lands", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this land post?")) {
      try {
        await deleteLand(id);
        fetchSalerLands();
      } catch {
        alert("Delete failed");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

 useEffect(() => {
  fetchSalerLands();
  fetchAppliedLands();
  fetchAllLands();
}, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="row g-4 mb-4">
              {[ 
                { title: "Apply", count: appliedLands.length, bg: "warning", text: "dark" },
                { title: "Buying", count: 1, bg: "success", text: "white" },
                { title: "Selling", count: salersLand.length, bg: "danger", text: "white" },
                { title: "Post", count: 10, bg: "info bg-opacity-50", text: "dark" },
              ].map((stat, i) => (
                <div className="col-md-6 col-lg-3" key={i}>
                  <div className={`card text-center bg-${stat.bg} text-${stat.text} shadow`}>
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{stat.title}</h5>
                      <h2 className="fw-bold">{stat.count}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h5 className="text-muted">Select a section from the sidebar to manage land records.</h5>
          </>
        );
      case "post":
  return (
    <LandTable
      title="Your Posted Lands"
      columns={[
        { label: "Location", key: "location" },
        { label: "Mauja", key: "mauja" },
        { label: "Khatian No", key: "khatianNo" },
        { label: "Amount", key: "amount" },
      ]}
      data={salersLand}
      onDelete={handleDelete}
    />
  );
      case "apply":
  return (
    <LandTable
      title="Lands You've Applied To"
      columns={[
        { label: "Location", key: "location" },
        { label: "Mauja", key: "mauja" },
        { label: "Khatian No", key: "khatianNo" },
      ]}
      data={appliedLands}
    />
  );
     case "buy":
  return (
    <LandTable
      title="Buy Land"
      columns={[
        { label: "Location", key: "location" },
        { label: "Mauja", key: "mauja" },
        { label: "Khatian No", key: "khatianNo" },
        { label: "Amount", key: "amount" },
      ]}
      data={allLands.filter(land => land.sellerId !== userId)}
    />
  );
      case "sale":
  return (
    <LandTable
      title="Your Sale Land"
      columns={[
        { label: "Location", key: "location" },
        { label: "Mauja", key: "mauja" },
        { label: "Khatian No", key: "khatianNo" },
        { label: "Amount", key: "amount" },
      ]}
      data={salersLand}
    />
  );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container-fluid" style={{ marginTop: "30px" }}>
        <div className="row">
          {/* Sidebar */}
          <div className="col-12 col-md-3 mb-4">
            <button
              className="btn btn-outline-secondary d-md-none mb-3 text-dark"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰ Menu
            </button>

            {(sidebarOpen || window.innerWidth >= 768) && (
              <div className="bg-light p-3 rounded shadow-sm">
                <h5 className="fw-bold mb-4">Hi, {username}</h5>
                <ul className="list-group list-group-flush">
                  <li
                    className={`list-group-item list-group-item-action ${activeTab === "dashboard" ? "active" : ""}`}
                    onClick={() => setActiveTab("dashboard")}
                    style={{ cursor: "pointer" }}
                  >
                    Dashboard
                  </li>
                  <li
                    className={`list-group-item list-group-item-action ${activeTab === "apply" ? "active" : ""}`}
                    onClick={() => setActiveTab("apply")}
                    style={{ cursor: "pointer" }}
                  >
                    Apply Lands
                  </li>
                  <li
                    className={`list-group-item list-group-item-action ${activeTab === "post" ? "active" : ""}`}
                    onClick={() => setActiveTab("post")}
                    style={{ cursor: "pointer" }}
                  >
                    Post Land
                  </li>
                  <li
                    className={`list-group-item list-group-item-action ${activeTab === "buy" ? "active" : ""}`}
                    onClick={() => setActiveTab("buy")}
                    style={{ cursor: "pointer" }}
                  >
                    Buy Land
                  </li>
                  <li
                    className={`list-group-item list-group-item-action ${activeTab === "sale" ? "active" : ""}`}
                    onClick={() => setActiveTab("sale")}
                    style={{ cursor: "pointer" }}
                  >
                    Sale Land
                  </li>
                  <li
                    className="list-group-item list-group-item-action text-danger fw-bold"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="col-12 col-md-9">{renderContent()}</div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
