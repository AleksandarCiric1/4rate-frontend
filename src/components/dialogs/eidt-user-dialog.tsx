import { EditUserDefaultValues, EditUserSchema } from "@/schemas/user-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import EditUserForm from "../forms/edit-user-form";
import { FileUploadInput } from "../shared/file-upload-input";
import { Label } from "../ui/label";
import { User } from "@/types/user";
import { getUserAccountId } from "@/services/user-service";

type EditUserDialogProps = {
  onEdit: (editedUser: User) => void;
  user: User;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

const EditUserDialog = (props: EditUserDialogProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
  };

  const createEditUserForm = useForm<zod.infer<typeof EditUserSchema>>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      username: props.user?.username,
      email: props.user?.email,
      firstName: props.user?.firstName || "",
      lastName: props.user?.lastName || "",
      dateOfBirth: props.user?.dateOfBirth
        ? new Date(props.user.dateOfBirth)
        : undefined,
    },
  });

  const handleSubmitCreateForm = async (
    data: Zod.infer<typeof EditUserSchema>
  ) => {
    let obj = { userAccountId: getUserAccountId(), ...data };

    try {
      await axios.put(
        "http://localhost:8080/v1/userAccounts/updateUserAccount",
        obj
      );

      let avatarUrl: string | undefined;

      if (files.length > 0) {
        avatarUrl = await handleUpdateAvatar(files[0]);
      }

      const editedUser: User = {
        ...props.user,
        ...data,
        dateOfBirth: data.dateOfBirth
          ? new Date(data.dateOfBirth).toISOString()
          : "",
        avatarUrl: avatarUrl || props.user.avatarUrl,
      };
      props.onEdit(editedUser);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.put(
        `http://localhost:8080/v1/images/uploadAvatar/${getUserAccountId()}`,
        formData
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 max-h-[90vh] h-full overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        <Label>Avatar</Label>
        <FileUploadInput
          multiple={false}
          accept="image/*"
          onChange={handleFileUpload}
        />
        <EditUserForm
          form={createEditUserForm}
          onFormSubmit={handleSubmitCreateForm}
          buttonName="Edit"
        />
      </DialogContent>
    </Dialog>
  );
};

export { EditUserDialog };
