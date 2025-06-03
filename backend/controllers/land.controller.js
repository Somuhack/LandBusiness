const Property = require('../models/Property');
const uploadToCloudinaryAndRemoveLocal = require('../utils/cloudinaryUpload');

exports.addLand = async (req, res) => {
  try {
    const {
      location,
      khatianNo,
      amount,
      mauja,
      area,
      block,
      ps,
      dist,
      mobileNo,
    } = req.body;

    const salerId = req.user;
    const  email=req.email
    // From auth middleware

    const uploadPromises = req.files.map(file =>
      uploadToCloudinaryAndRemoveLocal(file.path)
    );

    const documentUrls = await Promise.all(uploadPromises);

    const newProperty = await Property.create({
      salerId,
      location,
      khatianNo,
      amount,
      mauja,
      area,
      block,
      ps,
      dist,
      mobileNo,
      email,
      documents: documentUrls
    });

    res.status(201).json({ msg: 'Land added successfully', data: newProperty });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deleteLand = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) return res.status(404).json({ msg: 'Land not found' });

    if (property.salerId.toString() !== req.user)
      return res.status(403).json({ msg: 'Unauthorized' });

    await property.remove();
    res.status(200).json({ msg: 'Land deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getLandById = async (req, res) => {
  try {
    const { id } = req.params;
    const land = await Property.findById(id).populate('salerId buyerId', 'name email');
    if (!land) return res.status(404).json({ msg: 'Land not found' });

    res.status(200).json(land);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getLandBySellerId = async (req, res) => {
  try {
    const sellerId = req.user;
    const lands = await Property.find({ salerId: sellerId }).populate('buyerId', 'name email');
    res.status(200).json(lands);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllLands = async (req, res) => {
  try {
    const lands = await Property.find()
      .populate('salerId', 'name email farmerType'); // Include other fields if needed
    res.status(200).json(lands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message, data: "Server error" });
  }
};
