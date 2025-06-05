// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import LandTable from "../components/LandTable";
// import React, { useEffect, useState } from "react";
// import MainLayout from "../Layout/MainLayout";
// import {
//   getSalerPayments,
//   getLandBySellerId,
//   deleteLand,
//   getAllLands,
//   approveBuyer,
//   getApplyersBySalerId,
//   getbuyingLandByid
// } from "../utils/api";

// import {
//   PieChart, Pie, Cell, Legend,
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
// } from "recharts";

// const COLORS = ["#1DCD9F", "#FEBA17", "#F79B72", "#1B56FD"];

// const Home = () => {
//   const userId = sessionStorage.getItem("userid");
//   const username = sessionStorage.getItem("username");

//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [salersLand, setSalersLand] = useState([]);
//   const [salingdetails, setSalingdetails] = useState([]);
//   const [buyingdetails, setBuyingdetails] = useState([]);
//   const [appliedLands, setAppliedLands] = useState([]);

//   const [receivedApplications, setReceivedApplications] = useState([]);

 
// console.log(buyingdetails.length);
//   const sealingDetails = async () => {
//     try {
//       const res = await getSalerPayments(userId);
//       setSalingdetails(res.data);
//     } catch (err) {
//       console.error("Failed to fetch saler lands", err);
//     }
//   };
//   const userbuyingDetails = async () => {
//     try {
//       const res = await getbuyingLandByid();
//       setBuyingdetails(res.data);
//       console.log(res.data);
//     } catch (err) {
//       console.error("Failed to fetch saler lands", err);
//     }
//   };

//   const fetchSalerLands = async () => {
//     try {
//       const res = await getLandBySellerId(userId);
//       setSalersLand(res.data);
//     } catch (err) {
//       console.error("Failed to fetch saler lands", err);
//     }
//   };

//   const fetchAppliedLands = async () => {
//     try {
//       const res = await getAllLands();
//       const applied = res.data.filter((land) =>
//         land.applyers.includes(userId)
//       );
//       setAppliedLands(applied);
//     } catch (err) {
//       console.error("Failed to fetch applied lands", err);
//     }
//   };

//   const fetchReceivedApplications = async () => {
//     try {
//       const res = await getApplyersBySalerId(userId);
//       setReceivedApplications(res.data);
//     } catch (err) {
//       console.error("Failed to fetch received applications", err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Delete this land post?")) {
//       try {
//         await deleteLand(id);
//         fetchSalerLands();
//       } catch {
//         alert("Delete failed");
//       }
//     }
//   };
//   const handleEdit =async (id) => {
//     window.location.href = `/edit/${id}`;
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     window.location.href = "/";
//   };

//   const handleApprove = async (landId, userIdToApprove) => {
//     if (!window.confirm("Are you sure you want to approve this buyer?")) return;
//     try {
//       await approveBuyer({ landId, buyerId: userIdToApprove });
//       alert("Buyer approved successfully!");
//       fetchReceivedApplications();
//     } catch (err) {
//       console.error("Approval failed", err);
//       alert("Failed to approve buyer.");
//     }
//   };

//   useEffect(() => {
//     fetchSalerLands();
//     fetchAppliedLands();
//     fetchReceivedApplications();
//     sealingDetails();
    
//   }, []);
//   useEffect(() => {
//     userbuyingDetails();
//   }, []);

//   const pieData = [
//     { name: "Apply", value: appliedLands.length },
//     { name: "Buying", value: buyingdetails.length },
//     { name: "Selling", value: salingdetails.length },
//     { name: "Post", value: salersLand.length },
//   ];
// console.log(buyingdetails)
//   const summaryBarData = [
//     { name: "Sale", value: salingdetails.length },
//     { name: "Buy", value: buyingdetails.length },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "dashboard":
//         return (
//           <>
//             <div className="row g-4 mb-4">
//               <ToastContainer position="top-right" />
//               {[{
//                 title: "Apply", count: appliedLands.length, bg: "#1DCD9F", text: "dark"
//               }, {
//                 title: "Buying", count: buyingdetails.length, bg: "#FEBA17", text: "white"
//               }, {
//                 title: "Selling", count: salingdetails.length, bg: "#F79B72", text: "white"
//               }, {
//                 title: "Post", count: salersLand.length, bg: "#1B56FD", text: "white"
//               }].map((stat, i) => (
//                 <div className="col-md-6 col-lg-3" key={i}>
//                   <div className={`card text-center  text-${stat.text} shadow` } style={{ backgroundColor: stat.bg }}>
//                     <div className="card-body">
//                       <h5 className="card-title fw-bold">{stat.title}</h5>
//                       <h2 className="fw-bold">{stat.count}</h2>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="row">
//               <div className="col-md-6">
//                 <h5 className="text-center">Activity Summary</h5>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       outerRadius={100}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip wrapperStyle={{ zIndex: 9999 }} />
//                     <Legend />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>

//               <div className="col-md-6">
//                 <h5 className="text-center">Land Summary</h5>
//                 <ResponsiveContainer width="60%" height={300}>
//                   <BarChart data={summaryBarData} barSize={60}>
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip wrapperStyle={{ zIndex: 9999 }} />
//                     <Bar dataKey="value">
//                       {summaryBarData.map((entry, index) => (
//                         <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Bar>
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           </>
//         );

//       case "post":
//         return (
//           <LandTable
//             title="Your Posted Lands"
//             columns={[
//               { label: "Location", key: "location" },
//               { label: "Mauja", key: "mauja" },
//               { label: "Khatian No", key: "khatianNo" },
//               { label: "Amount", key: "amount" },
//             ]}
//             data={salersLand}
//             onDelete={handleDelete}
//             onEdit={handleEdit}
//           />
//         );

//       case "apply":
//         return (
//           <LandTable
//             title="Lands You've Applied To"
//             columns={[
//               { label: "Location", key: "location" },
//               { label: "Mauja", key: "mauja" },
//               { label: "Khatian No", key: "khatianNo" },
//             ]}
//             data={appliedLands}
//           />
//         );

//       case "buy":
//         return (
//           <LandTable
//             title="Buy Land"
//             columns={[
//               { label: "Location", key: "location" },
//               { label: "Mauja", key: "mauja" },
//               { label: "Khatian No", key: "khatianNo" },
//               { label: "Amount", key: "amount" },
//             ]}
//             data={buyingdetails}
//           />
//         );

//       case "sale":
//         return (
//           <LandTable
//             title="Your Sale Land"
//             columns={[
//               { label: "Buyer Name", key: "buyerId.name" },
//               { label: "Location", key: "propertyId.location" },
//               { label: "Mauja", key: "propertyId.mauja" },
//               { label: "Khatian No", key: "propertyId.khatianNo" },
//               { label: "Amount", key: "amount" },
//             ]}
//             data={salingdetails}
//           />
//         );

//       case "applications":
//         return (
//           <div>
//             <h4 className="mb-3">Users Who Applied To Your Lands</h4>
//             {receivedApplications.length === 0 ? (
//               <p>No applications received yet.</p>
//             ) : (
//               receivedApplications.map((land) => (
//                 <div key={land._id} className="card mb-4">
//                   <div className="card-header bg-light">
//                     <strong>Land:</strong> {land.location} | <strong>Khatian No:</strong> {land.khatianNo}
//                   </div>
//                   <div className="card-body">
//                     {land.applyers.length === 0 ? (
//                       <p>No applicants for this land.</p>
//                     ) : (
//                       <table className="table table-bordered">
//                         <thead className="table-light">
//                           <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {land.applyers.map((applyer, index) => (
//                             <tr key={applyer._id}>
//                               <td>{index + 1}</td>
//                               <td>{applyer.name}</td>
//                               <td>{applyer.email}</td>
//                               <td>
//                                 <button
//                                   className="btn btn-sm btn-success"
//                                   onClick={() => handleApprove(land._id, applyer._id)}
//                                 >
//                                   Approve
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="container-fluid" style={{ marginTop: "30px" }}>
//         <div className="row">
//           <div className="col-12 col-md-3 mb-4">
//             <button
//               className="btn btn-outline-secondary d-md-none mb-3 text-dark"
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//             >
//               ☰ Menu
//             </button>

//             {(sidebarOpen || window.innerWidth >= 768) && (
//               <div className="bg-light p-3 rounded shadow-sm">
//                 <h5 className="fw-bold mb-4">Hi, {username}</h5>
//                 <ul className="list-group list-group-flush">
//                   {[
//                     { key: "dashboard", label: "Dashboard" },
//                     { key: "apply", label: "My Apply Land" },
//                     { key: "post", label: "My Post Land" },
//                     { key: "buy", label: "My Buy Land" },
//                     { key: "sale", label: "My Sale Land" },
//                     { key: "applications", label: "Show Applyers" },
//                   ].map(tab => (
//                     <li
//                       key={tab.key}
//                       className={`list-group-item list-group-item-action ${activeTab === tab.key ? "active" : ""}`}
//                       onClick={() => setActiveTab(tab.key)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       {tab.label}
//                     </li>
//                   ))}
//                   <li
//                     className="list-group-item list-group-item-action text-danger fw-bold bg-danger p-2 text-center rounded text-white w-50 mx-auto mt-3"
//                     onClick={handleLogout}
//                     style={{ cursor: "pointer" }}
//                   >
//                     Log Out
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>

//           <div className="col-12 col-md-9">{renderContent()}</div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// };

// export default Home;
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LandTable from "../components/LandTable";
import React, { useEffect, useState } from "react";
import MainLayout from "../Layout/MainLayout";
import {
  getSalerPayments,
  getLandBySellerId,
  deleteLand,
  getAllLands,
  approveBuyer,
  getApplyersBySalerId,
  getbuyingLandByid,
  contactDetails
} from "../utils/api";

import {
  PieChart, Pie, Cell, Legend,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const COLORS = ["#1DCD9F", "#FEBA17", "#F79B72", "#1B56FD"];

const Home = () => {
  const userId = sessionStorage.getItem("userid");
  const username = sessionStorage.getItem("username");

  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [salersLand, setSalersLand] = useState([]);
  const [salingdetails, setSalingdetails] = useState([]);
  const [buyingdetails, setBuyingdetails] = useState([]);
  const [appliedLands, setAppliedLands] = useState([]);
  const [receivedApplications, setReceivedApplications] = useState([]);
  const [messages, setMessages] = useState([]);

  const sealingDetails = async () => {
    try {
      const res = await getSalerPayments(userId);
      setSalingdetails(res.data);
    } catch (err) {
      console.error("Failed to fetch saler lands", err);
    }
  };

  const userbuyingDetails = async () => {
    try {
      const res = await getbuyingLandByid();
      setBuyingdetails(res.data);
    } catch (err) {
      console.error("Failed to fetch saler lands", err);
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

  const fetchMessages = async () => {
    try {
      const res = await contactDetails();
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
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

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  const handleApprove = async (landId, userIdToApprove) => {
    if (!window.confirm("Are you sure you want to approve this buyer?")) return;
    try {
      await approveBuyer({ landId, buyerId: userIdToApprove });
      alert("Buyer approved successfully!");
      fetchReceivedApplications();
    } catch (err) {
      console.error("Approval failed", err);
      alert("Failed to approve buyer.");
    }
  };

  useEffect(() => {
    fetchSalerLands();
    fetchAppliedLands();
    fetchReceivedApplications();
    sealingDetails();
    fetchMessages();
  }, []);

  useEffect(() => {
    userbuyingDetails();
  }, []);

  const pieData = [
    { name: "Apply", value: appliedLands.length },
    { name: "Buying", value: buyingdetails.length },
    { name: "Selling", value: salingdetails.length },
    { name: "Post", value: salersLand.length },
  ];

  const summaryBarData = [
    { name: "Sale", value: salingdetails.length },
    { name: "Buy", value: buyingdetails.length },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <div className="row g-4 mb-4">
              <ToastContainer position="top-right" />
              {[{
                title: "Apply", count: appliedLands.length, bg: "#1DCD9F", text: "dark"
              }, {
                title: "Buying", count: buyingdetails.length, bg: "#FEBA17", text: "white"
              }, {
                title: "Selling", count: salingdetails.length, bg: "#F79B72", text: "white"
              }, {
                title: "Post", count: salersLand.length, bg: "#1B56FD", text: "white"
              }].map((stat, i) => (
                <div className="col-md-6 col-lg-3" key={i}>
                  <div className={`card text-center  text-${stat.text} shadow` } style={{ backgroundColor: stat.bg }}>
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{stat.title}</h5>
                      <h2 className="fw-bold">{stat.count}</h2>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-6">
                <h5 className="text-center">Activity Summary</h5>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip wrapperStyle={{ zIndex: 9999 }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="col-md-6">
                <h5 className="text-center">Land Summary</h5>
                <ResponsiveContainer width="60%" height={300}>
                  <BarChart data={summaryBarData} barSize={60}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip wrapperStyle={{ zIndex: 9999 }} />
                    <Bar dataKey="value">
                      {summaryBarData.map((entry, index) => (
                        <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
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
            onEdit={handleEdit}
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
            data={buyingdetails}
          />
        );

      case "sale":
        return (
          <LandTable
            title="Your Sale Land"
            columns={[
              { label: "Buyer Name", key: "buyerId.name" },
              { label: "Location", key: "propertyId.location" },
              { label: "Mauja", key: "propertyId.mauja" },
              { label: "Khatian No", key: "propertyId.khatianNo" },
              { label: "Amount", key: "amount" },
            ]}
            data={salingdetails}
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
      case "messages":
        return (
          <div>
            <h4 className="mb-3">Contact Messages</h4>
            {messages.length == 0 ? (
              <p>No messages found.</p>
            ) : (
              messages.map((msg, index) => (
                <div key={msg._id || index} className="card mb-3">
                  <div className="card-body">
                    <h5 className="card-title">{msg.name} ({msg.email})</h5>
                    <p className="card-text">{msg.message}</p>
                    <small className="text-muted">Sent: {new Date(msg.createdAt).toLocaleString()}</small>
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
                    { key: "apply", label: "My Apply Land" },
                    { key: "post", label: "My Post Land" },
                    { key: "buy", label: "My Buy Land" },
                    { key: "sale", label: "My Sale Land" },
                    { key: "applications", label: "Show Applyers" },
                    { key: "messages", label: "Messages" }
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
                    className="list-group-item list-group-item-action text-danger fw-bold bg-danger p-2 text-center rounded text-white w-50 mx-auto mt-3"
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                  >
                    Log Out
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="col-12 col-md-9">{renderContent()}</div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
