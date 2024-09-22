import { Button } from "@/components/ui/button";
import defaultAvatar from "../../assets/default_avatar.png";
import { useEffect, useState } from "react";
import { EditUserDialog } from "../dialogs/eidt-user-dialog";
import { User, UserProfileData } from "@/types/user";
import axios from "axios";
import { getUserAccountId } from "@/services/user-service";
import { ChangePasswordDialog } from "../dialogs/change-password-dialog";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/providers/user";

const initialUserData = {
  username: "john_doe",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  dateOfBirth: "1990-01-01",
  avatarUrl: "https://via.placeholder.com/100",
};

const UserProfile = () => {
  const { toast } = useToast();
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isEditUsernDialogOpen, setIsEditUserDialogOpen] =
    useState<boolean>(false);
  const [userData, setUserData] = useState<UserProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [isPassChangingDialogOpen, setIsPassChangingDialogOpen] =
    useState(false);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/v1/admin/getUser/${user?.id}`)
      .then((response) => {
        setUserProfile(response.data);
      });
  }, []);

  useEffect(() => {
    const updateAvatar = async () => {
      setAvatar(null);

      setTimeout(() => {
        setAvatar(`http://localhost:8080/v1/images/getAvatar/${user?.id}`);
      }, 1);

      setTimeout(() => {
        console.log(avatar);
      }, 10);
    };
    if (userProfile?.avatarUrl !== null && userProfile?.avatarUrl !== undefined)
      updateAvatar();
  }, [userProfile?.avatarUrl]);

  useEffect(() => {
    if (userProfile) {
      console.log(userProfile);
    }
  }, [userProfile]);

  const handleEdit = () => {
    setIsEditUserDialogOpen(true);
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

  const handleEditUser = (editedUser: User) => {
    setUserProfile(editedUser);
    setIsEditUserDialogOpen(false);
  };

  const handleChangePassword = () => {
    setIsPassChangingDialogOpen(true);
  };

  const handleSubmitFormChangePassword = (value: boolean) => {
    if (value) {
      toast({
        variant: "default",
        title: "Password change",
        description: "Password changed successfully!",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Password change",
        description: "Couldn't change password!",
      });
    }
    setIsPassChangingDialogOpen(false);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="flex items-center space-x-6">
        <img
          // src={
          //   user?.avatarUrl !== "" ? avatar : defaultAvatar
          //   // ? `http://localhost:8080/v1/images/getAvatar/${user?.id}`
          //   // : defaultAvatar
          // }
          src={avatar !== null ? avatar : defaultAvatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border dark:border-gray-600"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {userProfile?.firstName} {userProfile?.lastName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            @{userProfile?.username}
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
          {userProfile?.username}
        </div>

        <div className="font-medium text-gray-900 dark:text-gray-100">
          First Name:
        </div>
        <div className="text-gray-700 dark:text-gray-400">
          {userProfile?.firstName}
        </div>

        <div className="font-medium text-gray-900 dark:text-gray-100">
          Last Name:
        </div>
        <div className="text-gray-700 dark:text-gray-400">
          {userProfile?.lastName}
        </div>

        <div className="font-medium text-gray-900 dark:text-gray-100">
          Email:
        </div>
        <div className="text-gray-700 dark:text-gray-400">
          {userProfile?.email}
        </div>

        <div className="font-medium text-gray-900 dark:text-gray-100">
          Date of Birth:
        </div>
        <div className="text-gray-700 dark:text-gray-400">
          {userProfile?.dateOfBirth ? formatDate(userProfile.dateOfBirth) : ""}
        </div>
      </div>
      {userProfile && (
        <EditUserDialog
          user={userProfile}
          onEdit={handleEditUser}
          isOpen={isEditUsernDialogOpen}
          onOpenChange={setIsEditUserDialogOpen}
        />
      )}

      <ChangePasswordDialog
        onChange={handleSubmitFormChangePassword}
        isOpen={isPassChangingDialogOpen}
        onOpenChange={setIsPassChangingDialogOpen}
      />
      <div className="mt-6">
        <Button onClick={handleChangePassword}>Change Password</Button>
      </div>
    </div>
  );
};

export default UserProfile;
