import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/providers/user";
import { ManagerActions } from "@/types/manager";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { RestaurantDetailsPage } from "@/pages/shared/restaurant-details";

const RestaurantPage = () => {
  const { user } = useUser();
  const [restaurantDetails, setRestaurantDetails] = useState({
    name: "",
    description: "",
    workTime: "",
    capacity: "", // Initialize capacity as an empty string to avoid default 0
  });
  const [managerActions, setManagerActions] = useState<ManagerActions | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [workTimeError, setWorkTimeError] = useState("");
  const [restaurantApproved, setRestaurantApproved] = useState(true);

  // Validate the work time format with a regular expression
  const workTimeRegex =
    /^([01]?[0-9]|2[0-3]):[0-5][0-9]\s*-\s*([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

  useEffect(() => {
    if (user?.id) {
      axios
        .get(`http://localhost:8080/v1/manager/restaurant-status/${user.id}`)
        .then((response) => {
          if (response.status === 200) {
            setManagerActions(ManagerActions.ACTIVE);
          } else if (response.status === 202) {
            setManagerActions(ManagerActions.PENDING);
          } else {
            setManagerActions(ManagerActions.NEWREQ);
          }
        })
        .catch((error) => {
          if (
            error.status === 403 &&
            error.response.data === "Restaurant is blocked"
          ) {
            setManagerActions(ManagerActions.FORBIDEN);
          }
        });
    }
  }, [user?.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setRestaurantDetails((prevDetails) => ({
      ...prevDetails,
      [name]: name === "capacity" ? value : value, // Keep capacity as string until submission
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (
      !restaurantDetails.name ||
      !restaurantDetails.description ||
      !restaurantDetails.workTime ||
      !restaurantDetails.capacity
    ) {
      setError("All fields are required");
      return;
    }

    // Validate work time format
    if (!workTimeRegex.test(restaurantDetails.workTime)) {
      setError(
        "Invalid work time format. Use HH:MM - HH:MM (e.g., 9:00 - 22:00)"
      );
      return;
    }

    // Ensure capacity is a valid number
    const capacityNumber = Number(restaurantDetails.capacity);
    if (isNaN(capacityNumber) || capacityNumber <= 0) {
      setError("Please enter a valid capacity number");
      return;
    }

    setLoading(true);
    setError("");

    axios
      .post(
        `http://localhost:8080/v1/requestForRestaurants/createRequest/${user?.id}`,
        { ...restaurantDetails, capacity: capacityNumber } // Submit capacity as number
      )
      .then((response) => {
        setTimeout(() => {}, 2000);
        setManagerActions(ManagerActions.PENDING);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to submit the request. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (managerActions === null) {
    <LoadingSpinner />;
  }

  return (
    <div className="">
      {managerActions === ManagerActions.NEWREQ && (
        <div className="w-full max-w-[100%] sm:max-w-[80%] lg:max-w-[60%] mx-auto p-5">
          <h2 className="text-xl mb-4">Create a request for Restaurant</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Restaurant Name</label>
              <input
                type="text"
                name="name"
                value={restaurantDetails.name}
                onChange={handleInputChange}
                placeholder="Restaurant Name"
                className="block w-full border p-2 rounded-md dark:text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700">Work Time</label>
              <input
                type="text"
                name="workTime"
                value={restaurantDetails.workTime}
                onChange={handleInputChange}
                placeholder="e.g. 9:00 AM - 9:00 PM"
                className="block w-full border p-2 rounded-md dark:text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700">Capacity</label>
              <input
                type="text" // Keep it as text to prevent default value '0'
                name="capacity"
                value={restaurantDetails.capacity}
                onChange={handleInputChange}
                placeholder="Enter restaurant capacity"
                className="block w-full border p-2 rounded-md dark:text-black"
              />
            </div>

            <div>
              <label className="block text-gray-700">
                Restaurant Description
              </label>
              <textarea
                name="description"
                value={restaurantDetails.description}
                onChange={handleInputChange}
                placeholder="Describe your restaurant"
                className="block w-full border p-2 rounded-md dark:text-black"
                rows={5}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                loading ? "opacity-50" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      )}

      {managerActions === ManagerActions.PENDING && (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold mb-4">Request in Progress</h2>
          <p className="text-lg mb-2">
            Your request to create a restaurant is currently being processed.
          </p>
          <p className="text-gray-600">
            We’ll notify you once the process is complete. Thank you for your
            patience!
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 mt-4"></div>
        </div>
      )}

      {managerActions === ManagerActions.ACTIVE && <RestaurantDetailsPage />}
      {managerActions === ManagerActions.FORBIDEN && (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold mb-4">Restaurant Blocked</h2>
          <p className="text-lg mb-2">
            Unfortunately, your restaurant has been blocked by an administrator.
          </p>
          <p className="text-gray-600">
            If you wish to manage a restaurant again, you will need to create a
            new account.
          </p>
          <div className="text-red-600 mt-4">
            Please contact support if you need assistance.
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
