import { Button } from "@/components/ui/button";
import defaultAvatar from "../assets/default_avatar.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const initialUserData = {
  username: "john_doe",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  dateOfBirth: "1990-01-01",
  avatarUrl: "https://via.placeholder.com/100",
};

const UserProfile = () => {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [isPassChanging, setIsPassChanging] = useState(false);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewAvatar(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="flex items-center space-x-6">
        <img
          // src={newAvatar ? URL.createObjectURL(newAvatar) : userData.avatarUrl}
          src={defaultAvatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border dark:border-gray-600"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {userData.firstName} {userData.lastName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            @{userData.username}
          </p>
          <Button onClick={handleEdit} className="mt-2">
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-600 pt-4">
        <div className="font-medium text-gray-900 dark:text-gray-100">
          Username:
        </div>
        <div className="text-gray-700 dark:text-gray-400">
          {userData.username}
        </div>

        <div className="font-medium text-gray-900 dark:text-gray-100">
          First Name:
        </div>
        <div className="text-gray-700 dark:text-gray-400">
          {userData.firstName}
        </div>

        <div className="font-medium text-gray-900 dark:text-gray-100">
          Last Name:
        </div>
        <div className="text-gray-700 dark:text-gray-400">
          {userData.lastName}
        </div>

        <div className="font-medium text-gray-900 dark:text-gray-100">
          Email:
        </div>
        <div className="text-gray-700 dark:text-gray-400">{userData.email}</div>

        <div className="font-medium text-gray-900 dark:text-gray-100">
          Date of Birth:
        </div>
        <div className="text-gray-700 dark:text-gray-400">
          {userData.dateOfBirth}
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              Edit Profile
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Label
              htmlFor="avatar-upload"
              className="text-gray-900 dark:text-gray-100"
            >
              Change Avatar
            </Label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              className="text-gray-700 dark:text-gray-400"
            />

            <Label
              htmlFor="username"
              className="text-gray-900 dark:text-gray-100"
            >
              Username
            </Label>
            <Input
              id="username"
              value={editData.username}
              onChange={(e) =>
                setEditData({ ...editData, username: e.target.value })
              }
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <Label
              htmlFor="firstName"
              className="text-gray-900 dark:text-gray-100"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              value={editData.firstName}
              onChange={(e) =>
                setEditData({ ...editData, firstName: e.target.value })
              }
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <Label
              htmlFor="lastName"
              className="text-gray-900 dark:text-gray-100"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              value={editData.lastName}
              onChange={(e) =>
                setEditData({ ...editData, lastName: e.target.value })
              }
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">
              Email
            </Label>
            <Input
              id="email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <Label htmlFor="dob" className="text-gray-900 dark:text-gray-100">
              Date of Birth
            </Label>

            <Input
              id="dob"
              type="date"
              value={editData.dateOfBirth}
              onChange={(e) =>
                setEditData({ ...editData, dateOfBirth: e.target.value })
              }
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPassChanging} onOpenChange={setIsPassChanging}>
        <div className="mt-4">
          <DialogTrigger>
            <Button>Change Password</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="bg-white dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-gray-100">
              Change Password
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <Label
              htmlFor="current-password"
              className="text-gray-900 dark:text-gray-100"
            >
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <Label
              htmlFor="new-password"
              className="text-gray-900 dark:text-gray-100"
            >
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />

            <Label
              htmlFor="confirm-password"
              className="text-gray-900 dark:text-gray-100"
            >
              Confirm New Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setIsPassChanging(false)}>Cancel</Button>
            <Button>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
