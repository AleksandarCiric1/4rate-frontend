export type RestaurantBlockFormData = {
  restaurantId: number;
  description: string;
};

export type RestaurantRequest = {
  id: number;
  name: string;
  description: string;
  workTime: string;
  // manager_id: number; this should be object, cause we need name of manager and other data possible
};
