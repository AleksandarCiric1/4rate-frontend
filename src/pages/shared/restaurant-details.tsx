import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import defaultAvatar from "../../assets/default_avatar.png";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/providers/user";
import { Restaurant } from "@/types/restaurant";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MenuButton from "@/components/shared/menu-button";
import { Camera, FilePenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { isWithinInterval, parse } from "date-fns";
import logo from "../../assets/logo.png";

export function RestaurantDetailsPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const isRestaurantOpen = (workTime: string) => {
    if (!workTime) return false;

    const [startTime, endTime] = workTime
      .split(" - ")
      .map((time) => parse(time, "HH:mm", new Date()));

    const currentTime = new Date();

    return isWithinInterval(currentTime, { start: startTime, end: endTime });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/restaurants/getRestaurant/${user?.id}`)
      .then((response) => {
        setRestaurant(response.data);
        setIsOpen(isRestaurantOpen(response.data.workTime));
      })
      .catch((error) => {
        console.log(error);
      });
    document.title = "4Rate: Restaurant";
  }, []);

  const handleEditClick = () => {
    navigate(`${restaurant?.id}/edit`);
  };

  const handleAddImageClick = () => {
    navigate(`${restaurant?.id}/addImages`);
  };

  return (
    <div className="relative ">
      <div className="relative h-[500px] overflow-hidden">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {restaurant?.images && restaurant.images.length > 0 ? (
              restaurant?.images.map((image, index) => (
                <CarouselItem key={index} className="h-full">
                  {image.imageUrl !== null && (
                    <img
                      src={`http://localhost:8080/v1/images/getImage/${restaurant.id}/${image.imageUrl}`}
                      alt="restaurant image"
                      className="w-full h-full object-cover"
                    />
                  )}
                </CarouselItem>
              ))
            ) : (
              <div className="text-5xl font-bold text-slate-300 flex justify-center items-center w-full h-1/2">
                Add images
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

          <Button
            onClick={handleEditClick}
            className="mt-4 bg-white text-black hover:bg-slate-300"
          >
            <FilePenLine className="mr-2" /> <span>Edit Restaurant </span>
          </Button>
        </div>
      </div>

      <div className="w-full flex justify-start max-w-[100%] sm:max-w-[80%] lg:max-w-[70%]  p-2">
        <div className="p-10 mt-10">
          <h2 className="text-3xl font-bold mb-4">Restaurant Management</h2>
          <p className="mb-6">
            You can see restaurant details and you can manage restaurant
          </p>

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
              <h3 className="text-2xl font-bold mb-4">Comments</h3>

              {restaurant?.comments.map((comment, index) => (
                <Card className="border-transparent" key={index}>
                  <CardContent className="p-0 space-y-4 ">
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage
                          src={
                            comment.guest.userAccount.avatarUrl !== null
                              ? " "
                              : defaultAvatar
                          }
                        />
                        <AvatarFallback>avatar</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col justify-center">
                        <p className="text-md font-semibold">
                          {comment.guest.userAccount.firstName +
                            " " +
                            comment.guest.userAccount.lastName}
                        </p>
                        <span className="text-sm">
                          {comment?.guest.userAccount.createdAt
                            ? new Date(
                                comment.guest.userAccount.createdAt
                              ).toLocaleDateString()
                            : ""}
                        </span>
                      </div>
                    </div>
                    <p className="text-md">{comment.comment}</p>
                  </CardContent>
                </Card>
              ))}
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

            <hr className="my-7" />

            <div>
              <h3 className="text-2xl font-bold mb-4">Edit Restaurant</h3>
              <Button onClick={handleEditClick}>
                <FilePenLine className="mr-2" /> <span>Edit Restaurant </span>
              </Button>
              <Button onClick={handleAddImageClick} className="ml-4">
                <Camera className="mr-2" /> <span>Add images</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
