import { Button } from "@/components/ui/button";
import { adminEndpoints, imageEndpoints } from "@/environments/api-endpoints";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/providers/user";
import { User } from "@/types/user";
import axios from "axios";
import { useEffect, useState } from "react";
import defaultAvatar from "../../assets/default_avatar.png";
import { ChangePasswordDialog } from "../dialogs/change-password-dialog";
import { EditUserDialog } from "../dialogs/eidt-user-dialog";

const UserProfile = () => {
  const { toast } = useToast();
  const { user, setUser } = useUser();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isEditUsernDialogOpen, setIsEditUserDialogOpen] =
    useState<boolean>(false);
  const [isPassChangingDialogOpen, setIsPassChangingDialogOpen] =
    useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      axios.get(adminEndpoints.getUser(user?.id)).then((response) => {
        setUserProfile(response.data);
      });
    } else {
      console.log("User ID is undefined");
    }
  }, []);

  useEffect(() => {
    const updateAvatar = async () => {
      setAvatar(null);

      if (!user || !user.id) return;
      setTimeout(() => {
        setAvatar(imageEndpoints.getAvatarByUserId(user?.id));
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

  const handleEditUser = (editedUser: User) => {
    setUser(editedUser);
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
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="max-w-lg mx-auto mt-8 mb-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="flex items-center space-x-6">
        <img
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
