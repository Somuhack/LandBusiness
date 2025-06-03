import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandTable from "../components/LandTable";
import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import {
  getLandBySellerId,
  deleteLand,
  getAllLands,
  approveBuyer,
  getApplyersBySalerId
} from "../utils/api";

const Home = () => {
  const userId = localStorage.getItem("userid");
  const username = localStorage.getItem("username");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [salersLand, setSalersLand] = useState([]);
  const [appliedLands, setAppliedLands] = useState([]);
  const [allLands, setAllLands] = useState([]);
  const [receivedApplications, setReceivedApplications] = useState([]);

  const fetchAllLands = async () => {
    try {
      const res = await getAllLands();
      setAllLands(res.data);
    } catch (err) {
      console.error("Failed to fetch all lands", err);
    }
  };

  const fetchSalerLands = async () => {
    try {
      const res = await getLandBySellerId(userId);
      setSalersLand(res.data);
    } catch (err) {
      console.error("Failed to fetch saler lands", err);
    }
  };
  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear();
    };

    window.addEventListener("unload", handleUnload);
    return () => {
      window.removeEventListener("unload", handleUnload);
    };
  }, []);
  const fetchAppliedLands = async () => {
    try {
      const res = await getAllLands();
      const applied = res.data.filter((land) =>
        land.applyers.includes(userId)
      );
      setAppliedLands(applied);
    } catch (err) {
      console.error("Failed to fetch applied lands", err);
    }
  };

  const fetchReceivedApplications = async () => {
    try {
      const res = await getApplyersBySalerId(userId);
      setReceivedApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch received applications", err);
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

  const handleApprove = async (landId, userIdToApprove) => {
    if (!window.confirm("Are you sure you want to approve this buyer?")) return;
    try {
      await approveBuyer({ landId, buyerId: userIdToApprove });
      alert("Buyer approved successfully!");
      fetchReceivedApplications(); // Refresh
    } catch (err) {
      console.error("Approval failed", err);
      alert("Failed to approve buyer.");
    }
  };

  useEffect(() => {
    fetchSalerLands();
    fetchAppliedLands();
    fetchAllLands();
    fetchReceivedApplications();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="row g-4 mb-4">
              <ToastContainer position="top-right" />
              {[
                { title: "Apply", count: appliedLands.length, bg: "warning", text: "dark" },
                { title: "Buying", count: 0, bg: "success", text: "white" },
                { title: "Selling", count: 0, bg: "danger", text: "white" },
                { title: "Post", count: salersLand.length, bg: "info bg-opacity-50", text: "dark" },
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
            data={allLands.filter(land => land.salerId == userId)}
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
      case "applications":
        return (
          <div>
            <h4 className="mb-3">Users Who Applied To Your Lands</h4>
            {receivedApplications.length === 0 ? (
              <p>No applications received yet.</p>
            ) : (
              receivedApplications.map((land) => (
                <div key={land._id} className="card mb-4">
                  <div className="card-header bg-light">
                    <strong>Land:</strong> {land.location} | <strong>Khatian No:</strong> {land.khatianNo}
                  </div>
                  <div className="card-body">
                    {land.applyers.length === 0 ? (
                      <p>No applicants for this land.</p>
                    ) : (
                      <table className="table table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {land.applyers.map((applyer, index) => (
                            <tr key={applyer._id}>
                              <td>{index + 1}</td>
                              <td>{applyer.name}</td>
                              <td>{applyer.email}</td>
                              <td>
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() => handleApprove(land._id, applyer._id)}
                                >
                                  Approve
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
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
                  {[
                    { key: "dashboard", label: "Dashboard" },
                    { key: "apply", label: "Apply Lands" },
                    { key: "post", label: "Post Land" },
                    { key: "buy", label: "Buy Land" },
                    { key: "sale", label: "Sale Land" },
                    { key: "applications", label: "Show Applyers" },
                  ].map(tab => (
                    <li
                      key={tab.key}
                      className={`list-group-item list-group-item-action ${activeTab === tab.key ? "active" : ""}`}
                      onClick={() => setActiveTab(tab.key)}
                      style={{ cursor: "pointer" }}
                    >
                      {tab.label}
                    </li>
                  ))}
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
