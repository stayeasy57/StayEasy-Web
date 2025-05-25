"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Search,
  Menu,
  Home,
  Calendar,
  MessageSquare,
  Users,
  ClipboardList,
  DollarSign,
  Star,
  Briefcase,
  ChevronDown,
  Plus,
  Bell,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import DashboardStats from "./DashboardStats";

// Dummy data
const newBookingsData = {
  count: 840,
  change: 8.7,
  period: "from last week",
};

const checkInData = {
  count: 231,
  change: -3.55,
  period: "from last week",
};

const checkOutData = {
  count: 124,
  change: -1.58,
  period: "from last week",
};

const totalRevenueData = {
  amount: "$123,980",
  change: 5.2,
  period: "from last week",
};

const revenueChartData = [
  { month: "Dec 2027", value: 100000 },
  { month: "Jan 2028", value: 150000 },
  { month: "Feb 2028", value: 190000 },
  { month: "Mar 2028", value: 240000 },
  { month: "Apr 2028", value: 180000 },
  { month: "May 2028", value: 215000 },
];

const roomAvailabilityData = {
  occupied: 286,
  reserved: 87,
  available: 32,
  notReady: 13,
};

const ratingsData = {
  overall: 4.6,
  status: "Impressive",
  details: {
    facilities: 4.4,
    cleanliness: 4.7,
    services: 4.6,
    comfort: 4.8,
    location: 4.5,
  },
};

const reservationsData = [
  { day: "12 Jun", booked: 45, canceled: 10 },
  { day: "13 Jun", booked: 55, canceled: 15 },
  { day: "14 Jun", booked: 50, canceled: 12 },
  { day: "15 Jun", booked: 60, canceled: 8 },
  { day: "16 Jun", booked: 70, canceled: 5 },
  { day: "17 Jun", booked: 65, canceled: 10 },
  { day: "18 Jun", booked: 75, canceled: 12 },
];

const bookingsByPlatformData = [
  { name: "Direct Booking", value: 61, color: "#003B95" },
  { name: "Booking.com", value: 12, color: "#0ea5e9" },
  { name: "Expedia", value: 11, color: "#eab308" },
  { name: "Airbnb", value: 9, color: "#84cc16" },
  { name: "Hotels.com", value: 5, color: "#8b5cf6" },
  { name: "Others", value: 2, color: "#f97316" },
];

const tasksData = [
  {
    date: "Jun.16, 2028",
    title: "Set Up Conference Room B for 10 AM Meeting",
  },
  {
    date: "Jun.17, 2028",
    title: "Restock Housekeeping Supplies on 3rd Floor",
  },
  {
    date: "Jun.19, 2028",
    title: "Inspect and Clean the Pool Area",
  },
  {
    date: "Jun.20, 2028",
    title: "Check-In Assistance During Peak Hours (3 PM - 6 PM)",
  },
];

const recentActivitiesData = [
  {
    type: "conference",
    title: "Conference Room Setup",
    description:
      "Laura from Maintenance prepared Room B for 10 AM event with required equipment and refreshments",
    time: "10:15 AM",
  },
  {
    type: "checkout",
    title: "Guest Check-Out",
    description:
      "Sarah Johnson completed check-out process and updated room availability for Room 301",
    time: "9:45 AM",
  },
  {
    type: "cleaning",
    title: "Room Cleaning Completed",
    description:
      "Maria completed thorough cleaning of Room 205 to guest ready status",
    time: "9:20 AM",
  },
  {
    type: "maintenance",
    title: "Maintenance Request Logged",
    description:
      "Request made to repair leaking faucet in Room 152, assigned to technical team",
    time: "9:10 AM",
  },
];

const bookingListData = [
  {
    id: "LG-B00108",
    guest: "Angus Cooper",
    roomType: "Deluxe",
    roomNumber: "101",
    duration: "3 nights",
    checkIn: "June 19, 2028",
    checkOut: "June 22, 2028",
    status: "Checked In",
  },
  {
    id: "LG-B00109",
    guest: "Catherine Lopez",
    roomType: "Standard",
    roomNumber: "202",
    duration: "2 nights",
    checkIn: "June 19, 2028",
    checkOut: "June 21, 2028",
    status: "Checked In",
  },
  {
    id: "LG-B00110",
    guest: "Edgar Irving",
    roomType: "Suite",
    roomNumber: "303",
    duration: "5 nights",
    checkIn: "June 19, 2028",
    checkOut: "June 24, 2028",
    status: "Pending",
  },
  {
    id: "LG-B00111",
    guest: "Ior R. Haskid",
    roomType: "Standard",
    roomNumber: "105",
    duration: "4 nights",
    checkIn: "June 19, 2028",
    checkOut: "June 23, 2028",
    status: "Checked In",
  },
];

// Helper components

const StatCard = ({ title, value, change, period, icon }: any) => {
  const isPositive = change >= 0;

  return (
    <div className="bg-primary/10 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm text-gray-600">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold mb-3">{value}</p>
      <div className="flex items-center text-xs">
        <div
          className={`flex items-center ${
            isPositive ? "text-primary" : "text-red-600"
          } mr-1`}
        >
          <span className="font-medium">
            {isPositive ? "↑" : "↓"} {Math.abs(change)}%
          </span>
        </div>
        <span className="text-gray-500">{period}</span>
      </div>
    </div>
  );
};

const SectionHeader = ({ title, hasViewMore = false }: any) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {hasViewMore && <MoreHorizontal size={18} className="text-gray-400" />}
    </div>
  );
};

const RoomAvailabilitySection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <SectionHeader title="Room Availability" hasViewMore={true} />

      <div className="flex">
        <div className="flex-1">
          <div className="h-24 bg-gradient-to-r from-primary/10 to-primary/80 rounded-lg mb-6"></div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Occupied</p>
              <p className="text-2xl font-bold">
                {roomAvailabilityData.occupied}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Reserved</p>
              <p className="text-2xl font-bold">
                {roomAvailabilityData.reserved}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Available</p>
              <p className="text-2xl font-bold">
                {roomAvailabilityData.available}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Not Ready</p>
              <p className="text-2xl font-bold">
                {roomAvailabilityData.notReady}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RevenueSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <SectionHeader title="Revenue" hasViewMore={false} />

      <div className="mb-4">
        <div className="bg-primary/15 text-xs rounded px-2 py-1 inline-block">
          <span className="font-medium">Total Revenue</span>
          <span className="ml-2 text-primary">$315,000</span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueChartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              tickFormatter={(value: any) => `$${value / 1000}K`}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#003B95"
              fill="url(#colorRevenue)"
              fillOpacity={0.3}
              strokeWidth={2}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#003B95" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#003B95" stopOpacity={0} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const RatingBar = ({ label, value }: any) => {
  return (
    <div className="flex items-center my-2">
      <span className="text-sm text-gray-600 w-20">{label}</span>
      <div className="flex-grow mx-4 h-2 bg-gray-100 rounded-full">
        <div
          className="h-2 bg-primary rounded-full"
          style={{ width: `${(value / 5) * 100}%` }}
        ></div>
      </div>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
};

const RatingSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col items-center mb-4">
        <h3 className="text-base font-medium mb-1">Overall Rating</h3>
        <div className="flex items-end mb-1">
          <span className="text-3xl font-bold">{ratingsData.overall}</span>
          <span className="text-sm text-gray-500">/5</span>
        </div>
        <p className="text-sm text-primary">{ratingsData.status}</p>
      </div>

      <div>
        <RatingBar label="Facilities" value={ratingsData.details.facilities} />
        <RatingBar
          label="Cleanliness"
          value={ratingsData.details.cleanliness}
        />
        <RatingBar label="Services" value={ratingsData.details.services} />
        <RatingBar label="Comfort" value={ratingsData.details.comfort} />
        <RatingBar label="Location" value={ratingsData.details.location} />
      </div>
    </div>
  );
};

const TaskItem = ({ date, title }: any) => {
  return (
    <div className="bg-primary/20 p-3 rounded-lg mb-2">
      <p className="text-xs text-gray-500 mb-1">{date}</p>
      <p className="text-sm">{title}</p>
    </div>
  );
};

const TasksSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        <button className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
          <Plus size={14} className="text-primary" />
        </button>
      </div>

      <div>
        {tasksData.map((task, index) => (
          <TaskItem key={index} date={task.date} title={task.title} />
        ))}
      </div>
    </div>
  );
};

const ReservationsSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Reservations</h2>
        <div className="bg-primary/20 text-xs rounded px-2 py-1 flex items-center">
          Last 7 Days
          <ChevronDown size={14} className="ml-1" />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-500">Booked</span>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-500">Canceled</span>
        </div>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={reservationsData}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            barGap={0}
            barSize={20}
          >
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <Bar dataKey="booked" fill="#003B95" radius={[4, 4, 0, 0]} />
            <Bar dataKey="canceled" fill="#003B95/20" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const BookingByPlatformSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Booking by Platform</h2>
        <MoreHorizontal size={18} className="text-gray-400" />
      </div>

      <div className="flex">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={bookingsByPlatformData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
              >
                {bookingsByPlatformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2">
          {bookingsByPlatformData.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm mr-1">{item.value}%</span>
              <span className="text-xs text-gray-500">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ActivityIcon = ({ type }: any) => {
  const bgColors: any = {
    conference: "bg-yellow-100",
    checkout: "bg-primary/30",
    cleaning: "bg-blue-100",
    maintenance: "bg-purple-100",
    checkin: "bg-orange-100",
  };

  const icons: any = {
    conference: <Calendar size={14} className="text-yellow-600" />,
    checkout: <Users size={14} className="text-primary" />,
    cleaning: <ClipboardList size={14} className="text-blue-600" />,
    maintenance: <Settings size={14} className="text-purple-600" />,
    checkin: <Home size={14} className="text-orange-600" />,
  };

  return (
    <div
      className={`w-8 h-8 rounded-full ${bgColors[type]} flex items-center justify-center`}
    >
      {icons[type]}
    </div>
  );
};

const RecentActivitiesSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Activities</h2>
        <MoreHorizontal size={18} className="text-gray-400" />
      </div>

      <div>
        {recentActivitiesData.map((activity, index) => (
          <div key={index} className="flex mb-4">
            <ActivityIcon type={activity.type} />
            <div className="ml-3 flex-grow">
              <div className="flex justify-between">
                <h4 className="text-sm font-medium">{activity.title}</h4>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
              <p className="text-xs text-gray-500">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BookingList = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Booking List</h2>
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center">
            <Search size={14} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search guest, status, etc."
              className="bg-transparent border-none focus:outline-none text-xs w-40"
            />
          </div>
          <div className="bg-primary/20 text-xs rounded px-2 py-1 flex items-center">
            All Status
            <ChevronDown size={14} className="ml-1" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500">
              <th className="text-left pb-2 font-normal">Booking ID</th>
              <th className="text-left pb-2 font-normal">Guest Name</th>
              <th className="text-left pb-2 font-normal">Room Type</th>
              <th className="text-left pb-2 font-normal">Room Number</th>
              <th className="text-left pb-2 font-normal">Duration</th>
              <th className="text-left pb-2 font-normal">
                Check In & Check Out
              </th>
              <th className="text-left pb-2 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookingListData.map((booking, index) => (
              <tr key={index} className="text-xs border-t">
                <td className="py-3">{booking.id}</td>
                <td className="py-3">{booking.guest}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      booking.roomType === "Deluxe"
                        ? "bg-yellow-100 text-yellow-800"
                        : booking.roomType === "Standard"
                        ? "bg-primary/20 text-primary"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {booking.roomType}
                  </span>
                </td>
                <td className="py-3">Room {booking.roomNumber}</td>
                <td className="py-3">{booking.duration}</td>
                <td className="py-3">
                  {booking.checkIn} - {booking.checkOut}
                </td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      booking.status === "Checked In"
                        ? "bg-primary/20 text-primary"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  return (
    <div className="p-6 flex-1 overflow-auto">
      {/* <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          title="New Bookings"
          value={newBookingsData.count}
          change={newBookingsData.change}
          period={newBookingsData.period}
          icon={<Calendar size={18} className="text-gray-400" />}
        />
        <StatCard
          title="Check-In"
          value={checkInData.count}
          change={checkInData.change}
          period={checkInData.period}
          icon={<Calendar size={18} className="text-gray-400" />}
        />
        <StatCard
          title="Check-Out"
          value={checkOutData.count}
          change={checkOutData.change}
          period={checkOutData.period}
          icon={<Calendar size={18} className="text-gray-400" />}
        />
        <StatCard
          title="Total Revenue"
          value={totalRevenueData.amount}
          change={totalRevenueData.change}
          period={totalRevenueData.period}
          icon={<DollarSign size={18} className="text-gray-400" />}
        />
      </div> */}

      <div>
        <DashboardStats />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <RoomAvailabilitySection />
        <RevenueSection />
        <div className="flex flex-col gap-4">
          <RatingSection />
          <TasksSection />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <ReservationsSection />
        <BookingByPlatformSection />
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="col-span-3">
          <BookingList />
        </div>
        <RecentActivitiesSection />
      </div>
    </div>
  );
};

export default AdminDashboard;
