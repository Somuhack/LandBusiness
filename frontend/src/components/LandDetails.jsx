import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import { getLandById, applyToLand } from "../utils/api";

const LandDetails = () => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userid");
    const contentRef = useRef(null);

    const [isApplied, setIsApplied] = useState(false);
    const { id } = useParams();
    const [land, setLand] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applyStatus, setApplyStatus] = useState("");
    const handleBuyNow = () => {
        navigate(`/make-payment?propertyId=${land._id}&amount=${land.amount}`);
    };
    useEffect(() => {
        const fetchLand = async () => {
            try {
                const res = await getLandById(id);
                setLand(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch land details", error);
                setLoading(false);
            }
        };

        fetchLand();
    }, [id]);

    const handleApply = async () => {
        try {
            const res = await applyToLand(id);
            if (res.status === 200) {
                setIsApplied(true);
                setApplyStatus(res.data.message);
            }
        } catch (err) {
            console.error("Failed to apply land", err);
            setApplyStatus("Error applying. You may have already applied.");
        }
    };

    const handleDownloadPdf = async () => {
        if (!contentRef.current) return;

        // 1. Hide buttons and carousel controls before capturing
        const buttons = document.querySelectorAll("button");
        const carouselControls = document.querySelectorAll(".carousel-control-prev, .carousel-control-next");
        buttons.forEach(btn => btn.style.display = "none");
        carouselControls.forEach(btn => btn.style.display = "none");

        // 2. Wait for all images inside contentRef to load
        const images = contentRef.current.querySelectorAll("img");
        await Promise.all(
            Array.from(images).map(img => {
                if (img.complete && img.naturalHeight !== 0) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            })
        );

        // 3. Use html2canvas to render the content
        const canvas = await html2canvas(contentRef.current, {
            scale: 2,
            useCORS: true,
            allowTaint: false,
            logging: false,
            backgroundColor: null,
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pageWidth;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let position = 0;
        if (pdfHeight > pageHeight) {
            pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
            while (position + pageHeight < pdfHeight) {
                position -= pageHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
            }
        } else {
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        }

        pdf.save("land-details.pdf");

        // 4. Show buttons again after export
        buttons.forEach(btn => btn.style.display = "");
        carouselControls.forEach(btn => btn.style.display = "");
    };

    if (loading)
        return (
            <MainLayout>
                <div className="container mt-5">Loading...</div>
            </MainLayout>
        );

    return (
        <MainLayout>
            {/* Content to be exported */}
            <div className="container mt-4" ref={contentRef}>
                <h2 className="mb-4">Land Details</h2>

                {/* Static image instead of carousel */}
                {land.documents?.length > 0 && (
                    <div className="mb-4">
                        <div className="row g-2">
                            {land.documents.map((doc, index) => (
                                <div
                                    className="col-12 col-sm-6 col-md-4"
                                    key={index}
                                >
                                    <img
                                        src={doc}
                                        alt={`Land Document ${index + 1}`}
                                        className="img-fluid rounded shadow-sm"
                                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div
                    className="card p-4 shadow-sm"
                    style={{ borderRadius: "1rem", backgroundColor: "#f8f9fa" }}
                >
                    <h4 className="mb-4 fw-bold text-success">
                        ₹{land.amount.toLocaleString()}
                    </h4>

                    <div className="row mb-3">
                        <div className="col-md-6 mb-2">
                            <strong>Location:</strong> {land.location}
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>Khatian No:</strong> {land.khatianNo}
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>Block:</strong> {land.block}
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>Mauja:</strong> {land.mauja}
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>Area:</strong> {land.area}
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>Police Station:</strong> {land.ps}
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>District:</strong> {land.dist}
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>Email:</strong> {land.email}
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>Phone:</strong> {land.mobileNo}
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>Owner:</strong> {land.salerId?.name} ({land.salerId?.email})
                        </div>
                        <div className="col-md-6 mb-2">
                            <strong>Status:</strong>{" "}
                            <span
                                className={`badge ${land.isSale ? "bg-danger" : "bg-success"}`}
                            >
                                {land.isSale ? "Sold" : "Available"}
                            </span>
                        </div>
                    </div>

                    {applyStatus && <p className="mt-3 text-info">{applyStatus}</p>}
                </div>
            </div>

            {/* Buttons (not included in PDF) */}
            <div className="container mb-4 d-flex justify-content-center mt-4 gap-3">
                {!land.isSale ? (
                     !land.buyerId ?(
                        land.applyers.includes(userId) || isApplied ? (
                            <p>You have already applied for this land</p>
                        ) : (
                            <button className="btn btn-primary px-4 py-2" onClick={() => handleApply(land._id)}>
                                Apply for Land
                            </button>
                        )
                    ) : (
                        <button className="btn btn-primary px-4 py-2" onClick={handleBuyNow}>
                        Application Approved - Buy Now
                    </button>
                        
                    )
                ) : (
                    ""
                )}
                {land.documents?.length > 0 && (
                    <button className="btn btn-outline-success px-4 py-2" onClick={handleDownloadPdf}>
                        Download Details
                    </button>
                )}
            </div>
        </MainLayout>
    );
};

export default LandDetails;
