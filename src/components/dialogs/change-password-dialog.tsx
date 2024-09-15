import {
  ChangePasswordSchema,
  ChangePasswordDefaultValues,
} from "@/schemas/user-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z as zod } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ChangePasswordUserForm from "../forms/change-password-form";
import { getUserAccountId } from "@/services/user-service";
import { error } from "console";

type ChangePasswordDialogProps = {
  onChange: (value: boolean) => void;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

const ChangePasswordDialog = (props: ChangePasswordDialogProps) => {
  const changePasswordForm = useForm<zod.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: ChangePasswordDefaultValues,
  });

  const handleSubmitForm = (
    formData: Zod.infer<typeof ChangePasswordSchema>
  ) => {
    let obj = {
      userAccountId: getUserAccountId(),
      ...formData,
    };
    axios
      .put("http://localhost:8080/v1/userAccounts/passwordChange", obj)
      .then((response) => {
        props.onChange(true);
      })
      .catch((error) => {
        console.log(error);
        props.onChange(false);
      });
  };

  return (
    <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 max-h-[90vh]  overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Change password
          </DialogTitle>
        </DialogHeader>
        <ChangePasswordUserForm
          form={changePasswordForm}
          onFormSubmit={handleSubmitForm}
          buttonName="Submit"
        />
      </DialogContent>
    </Dialog>
  );
};

export { ChangePasswordDialog };
