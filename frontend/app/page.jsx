"use client";

import { useState } from "react";

const Home = () => {
  // State for Visitors
  const [addVisitorData, setAddVisitorData] = useState({
    name: "",
    age: "",
    preferences: "",
    virtualCurrencyBalance: "",
  });
  const [deleteVisitorData, setDeleteVisitorData] = useState({
    name: "",
    age: "",
  });
  const [lookupName, setLookupName] = useState("");
  const [visitorDetails, setVisitorDetails] = useState(null);

  // State for Rides
  const [rideSearchData, setRideSearchData] = useState({ waitTime: "", capacity: "" });
  const [rideResults, setRideResults] = useState(null);

  // Merchandise
  const [merchSearchPrice, setMerchSearchPrice] = useState("");
  const [merchResults, setMerchResults] = useState(null);

  // Staff
  const [staffResults, setStaffResults] = useState(null);

  // Events
  const [selectedLocation, setSelectedLocation] = useState(""); // Location dropdown
  const [eventResults, setEventResults] = useState(null);

  // Food Vendors
  const [popularMenuItem, setPopularMenuItem] = useState(null);
  const [foodVendorMessage, setFoodVendorMessage] = useState("");

  // General State
  const [message, setMessage] = useState("");
  const [selectedTable, setSelectedTable] = useState("");

  // Handle adding a visitor
  const handleAddVisitor = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/visitors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: addVisitorData.name,
        age: parseInt(addVisitorData.age),
        preferences: addVisitorData.preferences,
        virtual_currency_balance: parseFloat(addVisitorData.virtualCurrencyBalance),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage(`Visitor added: ${data.message}`);
      setAddVisitorData({ name: "", age: "", preferences: "", virtualCurrencyBalance: "" }); // Clear the form
      setVisitorDetails(null); // Clear lookup details
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

  // Handle deleting a visitor
  const handleDeleteVisitor = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/visitors", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: deleteVisitorData.name,
        age: parseInt(deleteVisitorData.age),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage(`Visitor deleted: ${data.message}`);
      setDeleteVisitorData({ name: "", age: "" }); // Clear the form
      setVisitorDetails(null); // Clear lookup details
    } else {
      setMessage(`Error: ${data.message}`);
    }
  };

    // Handle looking up a visitor
    const handleLookupVisitor = async (e) => {
      e.preventDefault();
      const response = await fetch(`/api/visitors?name=${encodeURIComponent(lookupName)}`);
      const data = await response.json();
      if (response.ok) {
        setVisitorDetails(data.visitor); // Display visitor details
        setMessage("");
      } else {
        setVisitorDetails(null);
        setMessage(`Error: ${data.message}`);
      }
      setLookupName(""); // Clear the lookup input
    };

    // Handle searching rides
    const handleSearchRides = async (e) => {
      e.preventDefault();
      const response = await fetch(
        `/api/rides?wait_time=${encodeURIComponent(rideSearchData.waitTime)}&capacity=${encodeURIComponent(rideSearchData.capacity)}`
      );
      const data = await response.json();
      if (response.ok) {
        setRideResults(data.rides);
        setMessage("");
      } else {
        setRideResults(null);
        setMessage(`Error: ${data.message}`);
      }
    };

    // Handle Staff Pay
    const handleViewStaffPay = async () => {
      const response = await fetch('/api/staff');
      const data = await response.json();
      if (response.ok) {
        setStaffResults(data.staff);
        setMessage("");
      } else {
        setStaffResults(null);
        setMessage(`Error: ${data.message}`);
      }
    };

    // Handle InParkEvents
    const handleViewEventsByLocation = async () => {
      if (!selectedLocation) {
        setMessage("Please select a location");
        return;
      }
    
      const response = await fetch('/api/InParkEvents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ location: selectedLocation }),
      });
    
      const data = await response.json();
      if (response.ok) {
        setEventResults(data.events);
        setMessage("");
      } else {
        setEventResults(null);
        setMessage(`Error: ${data.message}`);
      }
    };

    // Handle FoodVendors Most Popular Item Search
    const fetchPopularMenuItem = async () => {
      const response = await fetch("/api/foodVendors");
      const data = await response.json();
      if (response.ok) {
        setPopularMenuItem(data.menuItem);
        setFoodVendorMessage("");
      } else {
        setPopularMenuItem(null);
        setFoodVendorMessage(`Error: ${data.message}`);
      }
    };

    // Handle Merchandise Search
    const handleSearchMerchandise = async (e) => {
      e.preventDefault();
      const response = await fetch(
        `/api/merchandise?price=${encodeURIComponent(merchSearchPrice)}`
      );
      const data = await response.json();
      if (response.ok) {
        setRideResults(null); // clear any previous data
        setMerchResults(data.merchandise);
        setMessage("");
      } else {
        setMerchResults(null);
        setMessage(`Error: ${data.message}`);
      }
      setMerchSearchPrice(""); // Clear the input field
    }

    // Handle back button click
    const handleBackButton = () => {
      setSelectedTable("");
      setMessage("");
      setAddVisitorData({ name: "", age: "", preferences: "", virtualCurrencyBalance: "" });
      setDeleteVisitorData({ name: "", age: "" });
      setLookupName("");
      setVisitorDetails(null);
      setRideSearchData({ waitTime: "", capacity: "" });
      setRideResults(null);
      setMerchSearchPrice(""); 
      setMerchResults(null); 
      setStaffResults(null);
      setEventResults(null); 
      setSelectedLocation("");
      setPopularMenuItem(null); 
    setFoodVendorMessage("");
    };


  return (
    <div className="min-h-screen flex flex-col items-center mt-[30px]">
      <h1 className="text-5xl font-semibold mt-[50px] font-primary text-accent">
        Welcome to Data Park
      </h1>
      <p className="mt-6 text-lg text-gray-700 max-w-3xl text-center">
        At Data Park, excitement and adventure await around every corner. From
        thrilling rides to fun games, and delicious food to unforgettable
        events, we have something for everyone. Whether you&apos;re looking for
        a heart-pounding roller coaster or a relaxing spot to unwind, Data Park
        is the perfect destination for fun, family, and friends. Join us today
        and make memories that will last a lifetime!
      </p>

      {/* Display the table selection buttons */}
      {!selectedTable && (
        <div className="mt-[100px]">
          <h2 className="text-3xl font-semibold text-center">Select a Table</h2>
          <div className="mt-4">
            <button
              className="bg-accent text-white text-xl p-4 rounded mr-2"
              onClick={() => setSelectedTable("Visitors")}
            >
              Visitors
            </button>
            <button
              className="bg-accent text-white text-xl p-4 rounded mr-2"
              onClick={() => setSelectedTable("Rides")}
            >
              Rides
            </button>
            {/* <button
              className="bg-accent text-white text-xl p-4 rounded mr-2"
              disabled
            >
              Games
            </button> */}
            <button
              className="bg-accent text-white text-xl p-4 rounded mr-2"
              onClick={() => setSelectedTable("Staff")}
            >
              Staff
            </button>
            <button
              className="bg-accent text-white text-xl p-4 rounded mr-2"
              onClick={() => setSelectedTable("Events")}
            >
              In Park Events
            </button>
            <button
              className="bg-accent text-white text-xl p-4 rounded mr-2"
              onClick={() => setSelectedTable("Food Vendors")}
            >
              Food Vendors
            </button>
            <button
              className="bg-accent text-white text-xl p-4 rounded mr-2"
              onClick={() => setSelectedTable("Merchandise")}
            >
              Merchandise
            </button>
          </div>
        </div>
      )}

      {/* Visitors Forms */}
      {selectedTable === "Visitors" && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl">Manage Visitors</h2>

          {/* Add Visitor Form */}
          <form onSubmit={handleAddVisitor} className="mt-4">
            <input
              type="text"
              placeholder="Name"
              value={addVisitorData.name}
              onChange={(e) =>
                setAddVisitorData({ ...addVisitorData, name: e.target.value })
              }
              className="border p-2 mb-2"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={addVisitorData.age}
              onChange={(e) =>
                setAddVisitorData({ ...addVisitorData, age: e.target.value })
              }
              className="border p-2 mb-2"
              required
            />
            <input
              type="text"
              placeholder="Preferences"
              value={addVisitorData.preferences}
              onChange={(e) =>
                setAddVisitorData({
                  ...addVisitorData,
                  preferences: e.target.value,
                })
              }
              className="border p-2 mb-2"
            />
            <input
              type="number"
              placeholder="Currency Balance"
              value={addVisitorData.virtualCurrencyBalance}
              onChange={(e) =>
                setAddVisitorData({
                  ...addVisitorData,
                  virtualCurrencyBalance: e.target.value,
                })
              }
              className="border p-2 mb-4 mr-3"
              required
            />
            <button type="submit" className="bg-purple-600 text-white p-2 rounded">
              Add Visitor
            </button>
          </form>

          {/* Delete Visitor Form */}
          <form onSubmit={handleDeleteVisitor} className="mt-4">
            <input
              type="text"
              placeholder="Name"
              value={deleteVisitorData.name}
              onChange={(e) =>
                setDeleteVisitorData({ ...deleteVisitorData, name: e.target.value })
              }
              className="border p-2 mb-2"
              required
            />
            <input
              type="number"
              placeholder="Age"
              value={deleteVisitorData.age}
              onChange={(e) =>
                setDeleteVisitorData({ ...deleteVisitorData, age: e.target.value })
              }
              className="border p-2 mb-2 mr-3"
              required
            />
            <button type="submit" className="bg-red-700 text-white p-2 rounded">
              Delete Visitor
            </button>
          </form>

          {/* Look Up Visitor Form */}
          <form onSubmit={handleLookupVisitor} className="mt-4">
            <input
              type="text"
              placeholder="Look Up Visitor by Name"
              value={lookupName}
              onChange={(e) => setLookupName(e.target.value)}
              className="border p-2 mb-4 mr-3"
              required
            />
            <button type="submit" className="bg-green-600 text-white p-2 rounded">
              Look Up Visitor
            </button>
          </form>

          {/* Display Visitor Details */}
          {visitorDetails && (
            <div className="mt-6 border p-4 rounded bg-gray-100">
              <h3 className="text-xl text-accent font-semibold">Visitor Details</h3>
              <p><strong>Name:</strong> {visitorDetails.name}</p>
              <p><strong>Age:</strong> {visitorDetails.age}</p>
              <p><strong>Preferences:</strong> {visitorDetails.preferences || "N/A"}</p>
              <p>
                <strong>Available Currency:</strong> $
                {visitorDetails.virtual_currency_balance != null &&
                !isNaN(visitorDetails.virtual_currency_balance)
                ? Number(visitorDetails.virtual_currency_balance).toFixed(2)
                : "0.00"}
              </p>
            </div>
          )}
        </div>
      )}



      {/* Rides Form */}
      {selectedTable === "Rides" && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl">Search Rides</h2>
          <form onSubmit={handleSearchRides} className="mt-4">
            <input
              type="number"
              placeholder="Min Wait Time (min)"
              value={rideSearchData.waitTime}
              onChange={(e) => setRideSearchData({ ...rideSearchData, waitTime: e.target.value })}
              className="border p-2 mb-2"
              required
            />
            <input
              type="number"
              placeholder="Min Capacity"
              value={rideSearchData.capacity}
              onChange={(e) => setRideSearchData({ ...rideSearchData, capacity: e.target.value })}
              className="border p-2 mb-4 mr-3"
              required
            />
            <button type="submit" className="bg-green-600 text-white p-2 rounded">
              Search Rides
            </button>
          </form>
          {rideResults && (
            <div className="mt-6 border p-4 rounded bg-gray-100">
              <h3 className="text-xl text-accent font-semibold">Available Rides</h3>
              {rideResults.map((ride) => (
                <div key={ride.name} className="mb-4">
                  <p><strong>Name:</strong> {ride.name}</p>
                  <p><strong>Wait Time:</strong> {ride.wait_time} minutes</p>
                  <p><strong>Capacity:</strong> {ride.capacity}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}



      {/* Staff Form */}
      {selectedTable === "Staff" && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl">Average Pay by Role</h2>
          <button
            onClick={handleViewStaffPay}
            className="bg-green-600 text-white p-2 rounded mt-4"
          >
            View Average Pay
          </button>

          {/* Display Staff Results in Table */}
          {staffResults && (
            <div className="mt-6 border p-4 rounded bg-gray-100">
              <h3 className="text-xl text-accent font-semibold mb-4">Average Pay by Role</h3>
              <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Role</th>
                    <th className="border border-gray-300 px-4 py-2">Average Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {staffResults.map((staff) => (
                    <tr key={staff.role}>
                      <td className="border border-gray-300 px-4 py-2">{staff.role}</td>
                      <td className="border border-gray-300 px-4 py-2">${staff.average_pay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}



      {/* FoodVendors Form */}
      {selectedTable === "Food Vendors" && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl">Most Popular Menu Item</h2>
          <button
            onClick={fetchPopularMenuItem}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Find Most Popular Menu Item
          </button>

          {/* Display the Most Popular Menu Item */}
          {popularMenuItem && (
            <div className="mt-6 border p-4 rounded bg-gray-100">
              <h3 className="text-xl text-accent font-semibold">Most Popular Menu Item</h3>
              <p>
                <strong>Item:</strong> {popularMenuItem.menu_items}
              </p>
              <p>
                <strong>Frequency:</strong> {popularMenuItem.frequency}
              </p>
            </div>
          )}

          {/* Message */}
          {foodVendorMessage && <p className="mt-4 text-xl">{foodVendorMessage}</p>}
        </div>
      )}


      {/* InParkEvents Form */}
      {selectedTable === "Events" && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl">View Events by Location</h2>

          {/* Dropdown and Button */}
          <div className="mt-4">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)} // Only updates selection
              className="border p-2 rounded mr-4"
            >
              <option value="" disabled>
                Select a Location
              </option>
              <option value="Whole Park">Whole Park</option>
              <option value="Central Courtyard">Central Courtyard</option>
              <option value="West Park - East Park">West Park - East Park</option>
            </select>
            <button
              onClick={handleViewEventsByLocation} // Fetch data only on button click
              className={`p-2 rounded ${
                selectedLocation ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
              }`}
              disabled={!selectedLocation} // Disable if no location selected
            >
              View Events
            </button>
          </div>

          {/* Display Results Only After Button Click */}
          {eventResults && (
            <div className="mt-6 border p-4 rounded bg-gray-100">
              <h3 className="text-xl text-accent m-1 font-semibold">Events for {selectedLocation}</h3>
              <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Event Name</th>
                    <th className="border border-gray-300 px-4 py-2">Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {eventResults.map((event) => (
                    <tr key={event.name}>
                      <td className="border border-gray-300 px-4 py-2">{event.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{event.schedule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}




      {/* Merchandise Form */}
      {selectedTable === "Merchandise" && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl">Search Merchandise</h2>
          <form onSubmit={handleSearchMerchandise} className="mt-4">
            <input
              type="number"
              placeholder="Enter max price"
              value={merchSearchPrice}
              onChange={(e) => setMerchSearchPrice(e.target.value)}
              className="border p-2 mb-4 mr-3"
              required
            />
            <button type="submit" className="bg-green-600 text-white p-2 rounded">
              Search Merchandise
            </button>
          </form>

          {/* Display Merchandise Results */}
          {merchResults && (
            <div className="mt-6 border p-4 rounded bg-gray-100">
              <h3 className="text-xl text-accent font-semibold">Merchandise Items</h3>
              {merchResults.map((item) => (
                <div key={item.name} className="mb-4">
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Price:</strong> $
                  {item.price != null && !isNaN(item.price) ? Number(item.price).toFixed(2) : "0.00"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {message && <p className="mt-4 text-xl">{message}</p>}

      {selectedTable && (
        <button className="bg-gray-500 text-white p-2 rounded mt-4" onClick={handleBackButton}>
          Back to Table Options
        </button>
      )}
    </div>
  );
};

export default Home;