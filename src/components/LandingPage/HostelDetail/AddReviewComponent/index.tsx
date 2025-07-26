"use client";

import React, { useState } from "react";

import { usePostReviewMutation } from "@/store/api/apiSlice";

interface AddReviewProps {
  isOpen: boolean;
  onClose: () => void;
  id: any;
  onSubmit?: (review: ReviewData) => void;
}

interface ReviewData {
  rating: number;
  title: string;
  review: string;
  name: string;
  email: string;
}

const AddReviewComponent: React.FC<AddReviewProps> = ({
  isOpen,
  onClose,
  id,
  onSubmit,
}) => {
  // State for form inputs
  const [rating, setRating] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [review, setReview] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [errorMessage , setErrorMessage] = useState("");

  const [postReview , {isLoading}] = usePostReviewMutation();

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  // Handle star rating selection
  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  // Validate form data
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (rating === 0) {
      newErrors.rating = "Please select a rating";
    }


    if (!review.trim()) {
      newErrors.review = "Review content is required";
    } else if (review.trim().length < 20) {
      newErrors.review = "Review must be at least 20 characters";
    }

   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    try{

    e.preventDefault();

    console.log('e', review, rating)

    if (validateForm()) {
      // setIsSubmitting(true);

      console.log('id', id, rating, review);

      const resp = await postReview({ propertyId : id , rating: rating, review }).unwrap();

      if(resp?.statusCode === 403){
        setErrorMessage(resp?.message);
      }else{
        setErrorMessage("");
      }

      console.log('resp', resp)

      // Simulate API call with timeout
      setTimeout(() => {
        // onSubmit({ rating, title, review, name, email });
        // setIsSubmitting(false);
        // onClose();

        // Reset form
        setRating(0);
        setTitle("");
        setReview("");
        setName("");
        setEmail("");
      }, 1000);
    }

  }catch(err){
    console.log(err)
  }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 md:mx-auto my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-800">Write a Review</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Rating */}
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Rating *
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="text-2xl focus:outline-none transition-transform hover:scale-110"
                >
                  <span
                    className={
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="mt-1 text-red-500 text-sm">{errors.rating}</p>
            )}
          </div>

       

          {/* Review Content */}
          <div className="mb-4">
            <label
              htmlFor="review-content"
              className="block mb-2 font-medium text-gray-700"
            >
              Your Review *
            </label>
            <textarea
              id="review-content"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share details about your experience here"
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              required
            />
            {errors.review && (
              <p className="mt-1 text-red-500 text-sm">{errors.review}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">Minimum 20 characters</p>
          </div>

          {/* Personal Information */}
       
          {errorMessage && (
              <p className="mt-1 text-red-500 text-sm">Sorry, {errorMessage}</p>
            )}

          {/* Submit Button */}
          <div className="flex justify-end border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 mr-2 text-gray-700 border border-gray-300 rounded-md font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-md font-medium transition ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewComponent;
