export type User = {
  id: number;
  userAccountId: number;
  username: string;
  role: string;
  status: string;
  confirmed: boolean;
  email: string;
  created_at: string;
  avatar_url: string;
  date_of_birth: string;
  first_name: string;
  last_name: string;
};

export type UserAccountCreation = {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  email: string;
};
