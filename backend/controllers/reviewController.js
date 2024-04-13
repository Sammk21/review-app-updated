const Review = require("../model/review");

exports.createReview = async (req, res) => {
  try {
    const { content, userId } = req.body;
    console.log(content, userId);

    const review = new Review({ content, user: userId });
    await review.save();
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "username"); // Populate the 'user' field with 'username'
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getApprovedReviews = async (req, res) => {
  try {
    // Fetch only the reviews where status is 'approved'
    const approvedReviews = await Review.find({ status: "approved" }).populate(
      "user",
      "username"
    );
    res.json(approvedReviews);
  } catch (error) {
    console.error("Error fetching approved reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.reviewContent = async (req, res) => {
  try {
    const { reviewId, status } = req.body;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    review.status = status;
    await review.save();
    res.json({ message: "Review status updated successfully", review });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
