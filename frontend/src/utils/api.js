import API from './axiosConfig';

// 🧑‍🌾 User APIs
export const registerUser = (data) => API.post('/user/register', data);
export const loginUser = (data) => API.post('/user/login', data);
export const forgotPassword = (email) => API.post('/user/forgot-password', { email });
export const resetPassword = (token, password) => API.post(`/user/reset-password/${token}`, { newPassword:password});

// 🌍 Land APIs
export const addLand = (formData) => API.post('/land/add', formData); // formData with images
export const deleteLand = (id) => API.delete(`/land/delete/${id}`);
export const getLandById = (id) => API.get(`/land/${id}`);
export const getLandBySellerId = () => API.get('/land/seller/own');
export const getAllLands = () => API.get('/land/');

// 📝 Apply APIs
export const applyToLand = (landId) => API.post('/apply/apply', { landId });
export const removeApplication = (landId) => API.delete('/apply/remove-application', { data: { landId } });
export const getMyApplications = () => API.get('/apply/my-applications');
export const getApplicants = (landId) => API.get(`/apply/applicants/${landId}`);
export const downloadApplicants = (landId) => API.get(`/apply/download/${landId}`, { responseType: 'blob' });
export const getMyPurchases = () => API.get('/apply/my-buys');
export const approveBuyer = (data) => API.post('/apply/approve-buyer', data);
export const getApplyersBySalerId = (salerId) => API.get(`/apply/applyers-by-saler/${salerId}`);
// 💳 Payment APIs
export const makePayment = (data) => API.post('/payment/pay', data);
export const getBuyerPayments = () => API.get('/payment/buyer/history');
export const getSalerPayments = () => API.get('/payment/saler/history');
