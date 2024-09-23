import MenuButton from "@/components/shared/menu-button";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  imageEndpoints,
  managerEndpoints,
  restaurantEndpoints,
} from "@/environments/api-endpoints";
import { MakeReservationForm } from "@/pages/shared/reservation-form";
import { useUser } from "@/providers/user";
import { Report } from "@/types/report";
import { Restaurant } from "@/types/restaurant";
import axios from "axios";
import { isWithinInterval, parse } from "date-fns";
import { ArrowRightFromLine, Camera, FilePenLine, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MonthlyReportForm from "../guest/components/monthly-report";
import { ReservationChartComponent } from "../manager/components/reservations/reservation-chart";
import Review from "./review";

const REVIEWS_PER_PAGE = 5;

export function RestaurantDetailsPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const { id: restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showReportForm, setShowReportForm] = useState<boolean>(false);

  const isRestaurantOpen = (workTime: string) => {
    if (!workTime) return false;

    const [startTime, endTime] = workTime
      .split(" - ")
      .map((time) => parse(time, "HH:mm", new Date()));

    const currentTime = new Date();

    return isWithinInterval(currentTime, { start: startTime, end: endTime });
  };

  useEffect(() => {
    let path = "";
    if (restaurantId)
      path = restaurantEndpoints.getRestaurantById(restaurantId);
    else if (user) {
      path = restaurantEndpoints.getRestaurantByUserId(user?.id);
    } else {
      return;
    }

    axios
      .get(path)
      .then((response) => {
        setRestaurant(response.data);
        setIsOpen(isRestaurantOpen(response.data.workTime));
      })
      .catch((error) => {
        console.log(error);
      });
    document.title = "4Rate: Restaurant";
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    (restaurant?.reviews.length || 0) / REVIEWS_PER_PAGE
  );

  const currentReviews = restaurant?.reviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const handleEditClick = () => {
    navigate(`${restaurant?.id}/edit`);
  };

  const handleAddImageClick = () => {
    navigate(`${restaurant?.id}/addImages`);
  };

  const handleAddReview = () => {
    navigate(`/guest/${restaurant?.id}/addReview`);
  };

  const handleGetReporteClick = () => {
    setShowReportForm(true);
  };

  const handleMonthlyReportFormSubmit = (report: Report) => {
    downloadPdf(report);
    setShowReportForm(false);
  };

  const downloadPdf = async (report: Report) => {
    if (!restaurant || !restaurant.id) return;
    try {
      const response = await axios.post(
        managerEndpoints.pdf(restaurant?.id),
        report,
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `Activities_${user?.id}.pdf`;
      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Failed to download PDF", error);
    }
  };

  const parsedRestaurantId = restaurantId
    ? parseInt(restaurantId, 10)
    : undefined;

  if (!parsedRestaurantId && user?.role !== "manager") {
    return <p>Error: Invalid restaurant ID</p>;
  }

  return (
    <div className="relative">
      <div className="relative h-[500px] overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {restaurant?.images && restaurant.images.length > 0 ? (
              restaurant?.images.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  {image.imageUrl !== null && (
                    <img
                      src={imageEndpoints.getRestaurantImage(
                        restaurant.id,
                        image.imageUrl
                      )}
                      alt="restaurant image"
                      className="w-full h-full object-cover"
                    />
                  )}
                </CarouselItem>
              ))
            ) : user?.role === "MANAGER" ? (
              <div className="text-5xl font-bold text-slate-300 flex justify-center items-center w-full h-1/2">
                Add images
              </div>
            ) : (
              <div className="text-5xl font-bold text-slate-300 flex justify-center items-center w-full h-1/2">
                No images
              </div>
            )}
          </CarouselContent>
          <CarouselPrevious className="absolute left-1 top-1/2 transform -translate-y-1/2 z-20 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200" />
          <CarouselNext className="absolute right-1 top-1/2 transform -translate-y-1/2 z-20 bg-white text-black p-2 rounded-full shadow-lg hover:bg-gray-200" />
        </Carousel>

        <div className="absolute bottom-0 left-0 w-full p-10 text-white bg-gradient-to-t from-black/100 to-transparent">
          <div className="flex items-center space-x-3">
            <h1 className="text-5xl font-bold mb-4">{restaurant?.name} </h1>
            {restaurant?.workTime && (
              <span
                className={`${
                  isOpen ? "bg-green-500" : "bg-red-500"
                } text-white py-1 px-2 rounded-full text-lg font-semibold`}
              >
                {isOpen ? "Open" : "Closed"}
              </span>
            )}
          </div>
          <p className="text-lg mb-2">Rating: ⭐️⭐️⭐️⭐️⭐️ (4.5)</p>
          <p className="text-lg">Work Time: {restaurant?.workTime}</p>

          {user?.role === "manager" &&
            user.manager.restaurantId === restaurant?.id && (
              <Button
                onClick={handleEditClick}
                className="mt-4 bg-white text-black hover:bg-slate-300"
              >
                <FilePenLine className="mr-2" /> <span>Edit Restaurant </span>
              </Button>
            )}
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row justify-start p-2">
        <div className="w-full lg:w-2/3 p-10 mt-10">
          {user?.role === "manager" && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Restaurant Management</h2>
              <p className="mb-6">
                You can see restaurant details and you can manage restaurant
              </p>
            </div>
          )}

          {user?.role === "guest" && (
            <div>
              <Button onClick={handleAddReview} variant="destructive">
                <Star className="text-white " />
                <span className="pl-2 text-[16px]"> Write a review</span>
              </Button>
            </div>
          )}

          <hr className="my-7" />

          <div className="w-[150px]">
            <h2 className="text-2xl font-bold pb-8">Menu</h2>
            <MenuButton
              url="https://www.8milepidetroitstylepizza.com/menu"
              label="Website Menu"
            />
          </div>

          <hr className="my-7" />

          <h2 className="text-3xl font-bold mb-4">
            Restaurant Basic Information
          </h2>
          <div className="space-y-4">
            {restaurant?.name && (
              <p>
                <strong>Name:</strong> {restaurant.name}
              </p>
            )}
            {restaurant?.address && (
              <p>
                <strong>Address:</strong> {restaurant.address}
              </p>
            )}
            {restaurant?.city && (
              <p>
                <strong>City:</strong> {restaurant.city}
              </p>
            )}
            {restaurant?.country && (
              <p>
                <strong>Country:</strong> {restaurant.country}
              </p>
            )}
            {restaurant?.restaurantPhones &&
              restaurant.restaurantPhones.length > 0 && (
                <div className="flex items-start space-x-3 flex-wrap">
                  <strong className="w-20 text-lg font-medium">Phones:</strong>
                  <div className="flex flex-col gap-2">
                    {restaurant.restaurantPhones.map((phone, index) => (
                      <div key={index} className="">
                        {phone.phone}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            {restaurant?.restaurantCategories &&
              restaurant.restaurantCategories.length > 0 && (
                <div className="flex items-start space-x-3 flex-wrap">
                  <strong className="w-28 text-lg font-medium">
                    Categories:
                  </strong>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.restaurantCategories.map((category, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium shadow-md"
                      >
                        {category.category.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <hr className="my-7" />

          <div className="space-y-8">
            <div className="space-y-7">
              <h3 className="text-2xl font-bold mb-4">Reviews</h3>

              {currentReviews &&
                currentReviews.map((review, index) => (
                  <Review
                    key={index}
                    avatarUrl={
                      review.guest.userAccount.avatarUrl
                        ? imageEndpoints.getAvatarByUserId(
                            review.guest.userAccount.id
                          )
                        : ""
                    }
                    username={review.guest.userAccount.username}
                    rating={review.grade}
                    comment={review.comment}
                    createdAt={new Date(review.createdAt).toISOString()}
                  />
                ))}

              <div className="flex justify-start mt-8">
                <Pagination className="justify-start">
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
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          );
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>

            <hr className="my-7" />

            <div>
              <h3 className="text-2xl font-bold mb-4">Ratings</h3>
              <div className="flex space-x-4 items-center">
                <div className="flex items-center">
                  <span className="text-4xl font-semibold">4.5</span>
                  <span className="ml-2 text-lg">/ 5</span>
                </div>
                <p className="text-md">Based on 120 reviews</p>
              </div>
            </div>

            <hr className="my-7" />

            <div>
              <div className="text-2xl font-bold mb-4">About</div>
              <p>{restaurant?.description}</p>
            </div>

            {user?.role === "manager" &&
              user.manager.restaurantId === restaurant?.id && (
                <div>
                  <hr className="my-7" />
                  <div>
                    <div className="text-2xl font-bold mb-4">Analytics</div>
                    {restaurant && (
                      <ReservationChartComponent
                        restaurantId={restaurant?.id}
                      />
                    )}
                  </div>
                </div>
              )}

            <hr className="my-7" />

            {showReportForm && (
              <MonthlyReportForm onSubmit={handleMonthlyReportFormSubmit} />
            )}

            {user?.role === "manager" &&
              user.manager.restaurantId === restaurant?.id && (
                <div>
                  <h3 className="text-2xl font-bold mb-4">Edit Restaurant</h3>
                  <Button onClick={handleEditClick}>
                    <FilePenLine className="mr-2" />{" "}
                    <span>Edit Restaurant </span>
                  </Button>
                  <Button onClick={handleAddImageClick} className="ml-4">
                    <Camera className="mr-2" /> <span>Add images</span>
                  </Button>
                  <Button onClick={handleGetReporteClick} className="ml-4">
                    <ArrowRightFromLine className="mr-2" />{" "}
                    <span> Get monthly report</span>
                  </Button>
                </div>
              )}
          </div>
        </div>

        {user &&
          user?.role === "guest" &&
          restaurant?.manager.userAccount.status !== "suspended" &&
          parsedRestaurantId && (
            <div className="w-full lg:w-1/3 p-10 mt-10">
              <MakeReservationForm
                restaurantId={parsedRestaurantId}
                userId={user.id}
              />
            </div>
          )}
      </div>
    </div>
  );
}
