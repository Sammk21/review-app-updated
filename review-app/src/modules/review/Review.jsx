"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const url = "http://localhost:9000";

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/reviews/approved"
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  console.log(reviews);

  const handleReviewSubmit = async () => {
    try {
      await axios.post("http://localhost:9000/api/reviews", {
        content: newReview,
        userId: "661a8d1cf3d84402ac9fb34d",
      });
      alert("your review will be subbmitted shortly");
      fetchReviews();
      setNewReview("");
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  //   const isLoggedIn = () => {
  //     // Implement logic to check if user is logged in
  //     // For example, check if email and password are set
  //     return email && password;
  //   };

  //   const handleLogin = async () => {
  //     try {
  //       setLoading(true);
  //       // Make a request to login endpoint with email and password
  //       // Implement your login logic here
  //       setLoading(false);
  //       setShowLoginDialog(false);
  //     } catch (error) {
  //       console.error("Error logging in:", error);
  //       setLoading(false);
  //     }
  //   };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-10 text-black">
        <div className="md:w-3/5 w-3/4 px-10 flex flex-col gap-2 p-5 ">
          <h1 className="py-5 text-lg">Reviews</h1>
          <div className="flex  bg-opacity-20 border  rounded-md border-black">
            <input
              type="text"
              value={newReview}
              placeholder="Create a review"
              onChange={(e) => setNewReview(e.target.value)}
              className="p-2 bg-transparent focus:outline-none"
            />
          </div>

          <div>
            <button
              onClick={handleReviewSubmit}
              className="bg-white py-2 px-4 rounded-md text-black"
            >
              Add Review
            </button>
          </div>

          <div className="flex flex-col gap-3 mt-14">
            {reviews.map((review, index) => (
              <div key={index} className="flex flex-col gap-4 p-4">
                <div className="flex justify justify-between">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 text-center rounded-full bg-red-500">
                      J
                    </div>
                    <span>{review?.user?.username}</span>
                  </div>
                </div>
                <div>{review.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLoginDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-black p-8 rounded-lg shadow-lg text-white">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <div className="mb-4">
              <label
                htmlFor="forgot-email"
                className="block text-white font-semibold mb-1"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3  border border-gray-300 rounded-md text-black py-3"
              />
            </div>
            <div className="flex  flex-col my-2 justify-between">
              <label
                htmlFor="forgot-email"
                className="block text-white font-semibold mb-1"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3  border border-gray-300 rounded-md text-black py-3"
              />
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleLogin}
                className="border py-2 px-3"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                onClick={() => setShowLoginDialog(false)}
                className="border py-2 px-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
