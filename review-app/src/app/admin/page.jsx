"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleAccept = async (reviewId) => {
    try {
      await axios.put(`http://localhost:9000/api/reviews/${reviewId}`, {
        status: "approved",
        reviewId: reviewId,
      });

      fetchReviews(); // Refresh the reviews after updating
    } catch (error) {
      console.error("Error accepting review:", error);
    }
  };

  const handleReject = async (reviewId) => {
    try {
      await axios.put(`http://localhost:9000/api/reviews/${reviewId}`, {
        status: "rejected",
        reviewId: reviewId,
      });
      fetchReviews(); // Refresh the reviews after updating
    } catch (error) {
      console.error("Error rejecting review:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div>List of reviews</div>
      <div class="flex flex-col gap-3 ">
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
              <div className="my-3">
                <div className="text-sm font-bold">
                  <div>
                    <p>{review.status}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 ">
                <button
                  onClick={() => handleAccept(review._id)}
                  className="bg-black py-1 px-3 rounded-md text-white mr-4"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(review._id)}
                  className="bg-black py-1 px-3 rounded-md text-white"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
