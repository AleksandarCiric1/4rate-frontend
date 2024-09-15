export type User = {
  id: number;
  username: string;
  role: string;
  status: string;
  confirmed: boolean;
  email: string;
  createdAt: string;
  avatarUrl: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
};

export type UserAccountCreation = {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
  email: string;
};

export type UserProfileData = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBrith: Date;
};
