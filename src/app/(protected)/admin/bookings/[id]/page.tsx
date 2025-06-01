"use client";

import BookingDetails from "@/components/AdminPanel/Bookings/BookingDetails";
import React from "react";

import { useParams } from "next/navigation";

const BookingDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <BookingDetails params={{ id: id }} />
    </div>
  );
};

export default BookingDetailsPage;
