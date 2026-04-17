import Review from '../models/Review.js';

export const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const review = await Review.create({
      user: req.user._id,
      name: req.user.name,
      rating,
      comment,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true }).sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort('-createdAt');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      review.isApproved = true;
      await review.save();
      res.json({ message: 'Review approved' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
