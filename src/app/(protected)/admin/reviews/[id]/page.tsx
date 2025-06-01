"use client";

import React from "react";

import { useParams } from "next/navigation";
import ReviewDetails from "@/components/AdminPanel/Reviews/ReviewDetails";

const ReviewDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <ReviewDetails params={{ id: id }} />
    </div>
  );
};

export default ReviewDetailPage;
