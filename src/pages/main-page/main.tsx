import RestaurantCard from "@/components/shared/restaurant-card";
import { MainPageLayout } from "../layouts/main-page-layout";
import { useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const MainPage = () => {
  return (
    <MainPageLayout>
      <RestaurantsGrid />
    </MainPageLayout>
  );
};

const categories = ["All", "Italian", "Chinese", "Mexican", "Japanese"];

const restaurants = [
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant A",
    description: "A delightful place to enjoy a variety of cuisines.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant B",
    description: "Experience the finest dining with a view.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant C",
    description: "A cozy spot for great food and drinks.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant D",
    description: "Delicious meals served with a touch of elegance.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant A",
    description: "A delightful place to enjoy a variety of cuisines.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant B",
    description: "Experience the finest dining with a view.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant C",
    description: "A cozy spot for great food and drinks.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant D",
    description: "Delicious meals served with a touch of elegance.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant A",
    description: "A delightful place to enjoy a variety of cuisines.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant B",
    description: "Experience the finest dining with a view.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant C",
    description: "A cozy spot for great food and drinks.",
    link: "",
  },
  {
    imageUrl: "https://via.placeholder.com/400x300",
    name: "Restaurant D",
    description: "Delicious meals served with a touch of elegance.",
    link: "",
  },
];

const PAGE_SIZE = 10;

const RestaurantsGrid = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === "All" ||
          restaurant.description.includes(selectedCategory))
    );
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredRestaurants.length / PAGE_SIZE);
  const currentRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredRestaurants.slice(startIndex, endIndex);
  }, [currentPage, filteredRestaurants]);

  return (
    <main className="mt-1 py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Best Restaurants
        </h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search restaurants by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="mb-6 flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg border transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 mx-8">
          {currentRestaurants.map((restaurant, index) => (
            <RestaurantCard
              key={index}
              imageUrl={restaurant.imageUrl}
              name={restaurant.name}
              description={restaurant.description}
              link={restaurant.link}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
};

export { MainPage, RestaurantsGrid };
