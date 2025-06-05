import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makePayment } from '../../utils/api';
import MainLayout from '../../Layout/MainLayout';

const MakePayment = () => {
  const location = useLocation();
  const [propertyId, setPropertyId] = useState('');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const propId = query.get('propertyId');
    const amt = query.get('amount');
    if (propId && amt) {
      setPropertyId(propId);
      setAmount(amt);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!/^\d{16}$/.test(cardNumber)) {
      setMessage('Card number must be exactly 16 digits.');
      return;
    }

    setLoading(true);

    try {
      const res = await makePayment({
        propertyId,
        amount,
        cardNumber,
      });

      setMessage(res.data.msg || 'Payment successful');
      setCardNumber('');
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
   <MainLayout>
     <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">Make a Payment</h3>
      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="propertyId" className="form-label">Property ID</label>
          <input
            type="text"
            className="form-control"
            id="propertyId"
            value={propertyId}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount (Rs.)</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">Card Number</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
            maxLength="16"
            required
            placeholder="Enter 16-digit card number"
          />
        </div>
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
   </MainLayout>
  );
};

export default MakePayment;
