// error: "Cannot destructure property 'salerId' of 'req.body' as it is undefined."
import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from '../Layout/MainLayout';
import { addLand } from '../utils/api';
const LandPurchaseForm = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    salerId: localStorage.getItem('userid'),
    location: '',
    khatianNo: '',
    amount: '',
    mauja: '',
    area: '',
    block: '',
    ps: '',
    dist: '',
    mobileNo: '',
    email: localStorage.getItem('email'),
  });

  const [files, setFiles] = useState([]);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setSubmitStatus('');

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    for (let i = 0; i < files.length; i++) {
      data.append('documents', files[i]);
    }

    try {
      const response = await addLand(data);

      if (response.ok || response.status === 201) {
        setSubmitStatus('Form submitted successfully!');
        setFormData({
          salerId: '',
          location: '',
          khatianNo: '',
          amount: '',
          mauja: '',
          area: '',
          block: '',
          ps: '',
          dist: '',
          mobileNo: '',
          email: '',
        });
        setFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        setSubmitStatus('Failed to submit form.');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('An error occurred during submission.');
    } finally {
      setLoading(false); // End loading
    }
  };


  return (
    <MainLayout>
      <div className="container mt-5">
        <h2 className="mb-4">Land Record Form</h2>
        {submitStatus && <div className="alert alert-info">{submitStatus}</div>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Khatian No</label>
              <input type="text" name="khatianNo" className="form-control" value={formData.khatianNo} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Amount</label>
              <input type="number" name="amount" className="form-control" value={formData.amount} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Mauja</label>
              <input type="text" name="mauja" className="form-control" value={formData.mauja} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Area</label>
              <input type="text" name="area" className="form-control" value={formData.area} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Block</label>
              <input type="text" name="block" className="form-control" value={formData.block} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Police Station (PS)</label>
              <input type="text" name="ps" className="form-control" value={formData.ps} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">District</label>
              <input type="text" name="dist" className="form-control" value={formData.dist} onChange={handleChange} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Mobile No</label>
              <input type="tel" name="mobileNo" className="form-control" value={formData.mobileNo} onChange={handleChange} />
            </div>
            <div className="col-md-12">
              <label className="form-label">Upload Documents</label>
              <input type="file" name="documents" multiple className="form-control" onChange={handleFileChange} ref={fileInputRef} />
            </div>

          </div>

          <div className="m-4 text-center">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Post Land'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default LandPurchaseForm;