<!-- @format -->

/\*_ @format _/
"use client";
// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Select, Card, Rate, Tabs } from "antd";
import _ as echarts from "echarts";
import {
SearchOutlined,
GlobalOutlined,
UserOutlined,
CarOutlined,
TeamOutlined,
DollarOutlined,
CompassOutlined,
CalendarOutlined,
ClockCircleOutlined,
EnvironmentOutlined,
PlusOutlined,
} from "@ant-design/icons";
const { TabPane } = Tabs;
const App: React.FC = () => {
const mapRef = useRef<HTMLDivElement>(null);
const [searchValue, setSearchValue] = useState("");
const [activeTab, setActiveTab] = useState("1");
const [showCreateTripForm, setShowCreateTripForm] = useState(false);
const [showFindRideForm, setShowFindRideForm] = useState(false);
const [formData, setFormData] = useState({
tripName: "",
startDate: "",
endDate: "",
destination: "",
seats: "",
budget: "",
description: "",
});
useEffect(() => {
if (mapRef.current) {
const chart = echarts.init(mapRef.current);
const option = {
animation: false,
geo: {
map: "world",
roam: true,
itemStyle: {
areaColor: "#e9f1f6",
borderColor: "#ccc",
},
emphasis: {
itemStyle: {
areaColor: "#cce6ff",
},
},
},
series: [],
};
chart.setOption(option);
}
}, []);
const HomeContent = () => (
<>
{/_ Hero Section _/}
<div className="pt-16">
<div
className="relative h-[600px] bg-cover bg-center"
style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20minimalist%20travel%20scene%20with%20beautiful%20mountain%20landscape%20and%20lake%2C%20soft%20lighting%2C%20cinematic%20wide%20shot%2C%20high%20end%20travel%20photography%2C%20muted%20colors%2C%20peaceful%20atmosphere&width=1440&height=600&seq=1&orientation=landscape')`,
          }} >
<div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent">
<div className="max-w-[1440px] mx-auto px-8 py-24">
<div className="max-w-2xl">
<h1 className="text-5xl font-bold text-gray-900 mb-6">
Discover Smarter Ways to Travel Together
</h1>
<p className="text-xl text-gray-600 mb-8">
Connect with fellow travelers, share rides, and explore
destinations while saving costs. Make your journey more social
and affordable.
</p>
<div className="flex space-x-4">
<Button
type="primary"
size="large"
className="!rounded-button h-12 px-8 bg-purple-600"
onClick={() => setShowFindRideForm(true)} >
Find Rides
</Button>
<Button
size="large"
className="!rounded-button h-12 px-8"
onClick={() => setShowCreateTripForm(true)} >
Create Trip
</Button>
</div>
</div>
</div>
</div>
</div>
</div>
{/_ Search Section _/}
<div className="max-w-[1440px] mx-auto px-8 -mt-8 relative z-10">
<div className="bg-white rounded-xl shadow-lg p-6">
<div className="flex items-center space-x-4">
<Input
size="large"
placeholder="Where do you want to go?"
prefix={<SearchOutlined className="text-gray-400" />}
className="!rounded-button text-base"
value={searchValue}
onChange={(e) => setSearchValue(e.target.value)}
/>
<Button
              type="primary"
              size="large"
              className="!rounded-button bg-blue-600 px-8"
            >
Search
</Button>
</div>
</div>
</div>
{/_ Features Grid _/}
<div className="max-w-[1440px] mx-auto px-8 py-24">
<h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
<div className="grid grid-cols-3 gap-8">
{[
{
icon: <CompassOutlined className="text-4xl text-blue-600" />,
title: "Destination Discovery",
description:
"Browse detailed information on popular and hidden tourist spots.",
},
{
icon: <CarOutlined className="text-4xl text-blue-600" />,
title: "Transportation Services",
description:
"Book private or shared rides based on your group size and needs.",
},
{
icon: <TeamOutlined className="text-4xl text-blue-600" />,
title: "Ride-Sharing",
description:
"Share empty seats and split costs with other travelers.",
},
{
icon: <CalendarOutlined className="text-4xl text-blue-600" />,
title: "Trip Board",
description: "See upcoming rides and join available trips.",
},
{
icon: <i className="fas fa-users text-4xl text-blue-600" />,
title: "Group Planning",
description:
"Plan multi-stop trips with friends or like-minded travelers.",
},
{
icon: <DollarOutlined className="text-4xl text-blue-600" />,
title: "Cost Calculator",
description: "Calculate and split travel costs instantly.",
},
].map((feature, index) => (
<Card
              key={index}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
<div className="text-center">
<div className="mb-4">{feature.icon}</div>
<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
<p className="text-gray-600">{feature.description}</p>
</div>
</Card>
))}
</div>
</div>
</>
);
const TripsContent = () => (
<div className="pt-24">
<div className="max-w-[1440px] mx-auto px-8">
<div className="flex justify-between items-center mb-8">
<h2 className="text-3xl font-bold">My Trips</h2>
<Button
type="primary"
size="large"
icon={<PlusOutlined />}
className="!rounded-button bg-blue-600" >
Create New Trip
</Button>
</div>
<div className="grid grid-cols-3 gap-8">
{[1, 2, 3, 4, 5, 6].map((trip) => (
<Card
              key={trip}
              className="hover:shadow-lg transition-shadow cursor-pointer"
            >
<img
className="w-full h-48 object-cover rounded-lg mb-4"
src={`https://readdy.ai/api/search-image?query=beautiful%20travel%20destination%20scenic%20view%20with%20natural%20landscape%2C%20professional%20travel%20photography%20style%2C%20high%20resolution&width=400&height=300&seq=${trip}&orientation=landscape`}
alt="Trip"
/>
<h3 className="text-xl font-semibold mb-2">European Adventure</h3>
<div className="flex items-center space-x-4 text-gray-600 mb-4">
<span className="flex items-center">
<CalendarOutlined className="mr-2" />
July 15-30
</span>
<span className="flex items-center">
<EnvironmentOutlined className="mr-2" />5 Cities
</span>
</div>
<div className="flex justify-between items-center">
<div className="flex -space-x-2">
{[1, 2, 3].map((user) => (
<div
                      key={user}
                      className="w-8 h-8 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center"
                    >
<UserOutlined className="text-blue-600" />
</div>
))}
</div>
<span className="text-blue-600 font-semibold">$1,200</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
  const ShareRidesContent = () => (
    <div className="pt-24">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Share Rides</h2>
          <Button
            type="primary"
            size="large"
            icon={<CarOutlined />}
            className="!rounded-button bg-blue-600"
          >
            Offer a Ride
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((ride) => (
            <Card key={ride} className="hover:shadow-lg transition-shadow">
              <div className="flex space-x-6">
                <img
                  className="w-48 h-48 object-cover rounded-lg"
                  src={`https://readdy.ai/api/search-image?query=modern%20car%20on%20road%20trip%20journey%2C%20professional%20automotive%20photography%20style&width=200&height=200&seq=${ride}&orientation=squarish`}
alt="Car"
/>
<div className="flex-1">
<div className="flex justify-between items-start mb-4">
<div>
<h3 className="text-xl font-semibold mb-2">
New York → Boston
</h3>
<div className="flex items-center space-x-4 text-gray-600">
<span className="flex items-center">
<CalendarOutlined className="mr-2" />
July 1, 2025
</span>
<span className="flex items-center">
<ClockCircleOutlined className="mr-2" />
09:00 AM
</span>
</div>
</div>
<div className="text-right">
<p className="text-2xl font-semibold text-blue-600">
$45
</p>
<p className="text-sm text-gray-600">per person</p>
</div>
</div>
<div className="flex items-center space-x-4 mb-4">
<div className="flex items-center space-x-2">
<div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
<UserOutlined className="text-blue-600" />
</div>
<div>
<p className="font-medium">John D.</p>
<Rate disabled defaultValue={4} className="text-sm" />
</div>
</div>
<div className="text-gray-600">
<p>3 seats available</p>
</div>
</div>
<Button
                    type="primary"
                    className="!rounded-button bg-blue-600 w-full"
                  >
Book Seat
</Button>
</div>
</div>
</Card>
))}
</div>
</div>
</div>
);
return (
<div className="min-h-screen bg-white">
{/_ Find Ride Form Modal \*/}
{showFindRideForm && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className="bg-white rounded-xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">
<div className="flex justify-between items-center mb-6">
<h2 className="text-2xl font-bold">Find a Ride</h2>
<button
onClick={() => setShowFindRideForm(false)}
className="text-gray-500 hover:text-gray-700" >
<i className="fas fa-times text-xl"></i>
</button>
</div>
<form className="space-y-6">
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
From
</label>
<Input
placeholder="Enter departure location"
prefix={<EnvironmentOutlined className="text-gray-400" />}
className="!rounded-button"
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
To
</label>
<Input
placeholder="Enter destination"
prefix={<EnvironmentOutlined className="text-gray-400" />}
className="!rounded-button"
/>
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
Date
</label>
<Input type="date" className="!rounded-button" />
</div>
<div>
<label className="block text-sm font-medium text-gray-700 mb-2">
Passengers
</label>
<Select
className="w-full !rounded-button"
placeholder="Select number of passengers"
options={[
{ value: "1", label: "1 Passenger" },
{ value: "2", label: "2 Passengers" },
{ value: "3", label: "3 Passengers" },
{ value: "4", label: "4 Passengers" },
]}
/>
</div>
<Button
                type="primary"
                className="w-full !rounded-button bg-purple-600 hover:bg-purple-700"
              >
Search Rides
</Button>
</form>
</div>
</div>
)}

      {/* Create Trip Form Modal */}
      {showCreateTripForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Create a Trip</h2>
              <button
                onClick={() => setShowCreateTripForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Name
                </label>
                <Input
                  placeholder="Enter trip name"
                  value={formData.tripName}
                  onChange={(e) =>
                    setFormData({ ...formData, tripName: e.target.value })
                  }
                  className="!rounded-button"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="!rounded-button"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData({ ...formData, endDate: e.target.value })
                    }
                    className="!rounded-button"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <Input
                  placeholder="Enter destination"
                  prefix={<EnvironmentOutlined className="text-gray-400" />}
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="!rounded-button"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Seats
                  </label>
                  <Select
                    className="w-full !rounded-button"
                    placeholder="Select seats"
                    value={formData.seats}
                    onChange={(value) =>
                      setFormData({ ...formData, seats: value })
                    }
                    options={[
                      { value: "1", label: "1 Seat" },
                      { value: "2", label: "2 Seats" },
                      { value: "3", label: "3 Seats" },
                      { value: "4", label: "4 Seats" },
                    ]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget per Person
                  </label>
                  <Input
                    placeholder="Enter amount"
                    prefix={<DollarOutlined className="text-gray-400" />}
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="!rounded-button"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trip Description
                </label>
                <Input.TextArea
                  placeholder="Describe your trip plan..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="!rounded-button"
                />
              </div>
              <Button
                type="primary"
                className="w-full !rounded-button bg-purple-600 hover:bg-purple-700"
              >
                Create Trip
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="h-16 border-b border-gray-100 px-8 flex items-center justify-between fixed w-full bg-white z-50">
        <div className="flex items-center space-x-12">
          <h1 className="text-2xl font-bold text-purple-600">TravelShare</h1>
          <div className="flex space-x-8">
            <button
              className={`cursor-pointer whitespace-nowrap ${
                activeTab === "1"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("1")}
            >
              Explore
            </button>
            <button
              className={`cursor-pointer whitespace-nowrap ${
                activeTab === "2"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("2")}
            >
              Trips
            </button>
            <button
              className={`cursor-pointer whitespace-nowrap ${
                activeTab === "3"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("3")}
            >
              Share Rides
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 cursor-pointer">
            <GlobalOutlined />
            <span>EN</span>
          </button>
          <button className="w-8 h-8 bg-purple-50 rounded-full flex items-center justify-center cursor-pointer">
            <UserOutlined className="text-purple-600" />
          </button>
        </div>
      </nav>
      {activeTab === "1" && <HomeContent />}
      {activeTab === "2" && <TripsContent />}
      {activeTab === "3" && <ShareRidesContent />}
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TravelShare</h3>
              <p className="text-gray-400">
                Making travel more accessible, social, and affordable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-400 hover:text-white cursor-pointer">
                    About Us
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-white cursor-pointer">
                    How It Works
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-white cursor-pointer">
                    Safety
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-white cursor-pointer">
                    Support
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <button className="text-gray-400 hover:text-white cursor-pointer">
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-white cursor-pointer">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button className="text-gray-400 hover:text-white cursor-pointer">
                    Cookie Policy
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <i className="fab fa-twitter"></i>
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <i className="fab fa-instagram"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 TravelShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>

);
};
export default App;
