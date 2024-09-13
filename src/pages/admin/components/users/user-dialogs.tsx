import { User } from "@/types/user";
import { z as zod } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AdminCreateForm from "./user-forms";
import {
  AdminCreateDefaultValues,
  AdminCreateSchema,
} from "@/schemas/user-schemas";
import axios from "axios";

type AdminCreateDialogProps = {
  onCreate: (user: User) => void;
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
};

const AdminCreateDialog = (props: AdminCreateDialogProps) => {
  const createAdminForm = useForm<zod.infer<typeof AdminCreateSchema>>({
    resolver: zodResolver(AdminCreateSchema),
    defaultValues: AdminCreateDefaultValues,
  });

  const handleSubmitCreateForm = (
    formData: Zod.infer<typeof AdminCreateSchema>
  ) => {
    axios
      .post("http://localhost:8080/v1/admin/createAdminAccount", formData)
      .then((response) => {
        props.onCreate(response.data);
      });
    console.log("Creating admin!");
  };

  return (
    <>
      <Dialog open={props.isOpen} onOpenChange={props.onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus />
            Create admin
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create category</DialogTitle>
            <DialogDescription>
              Create a new category. Click create when you're done.
            </DialogDescription>
          </DialogHeader>
          <AdminCreateForm
            form={createAdminForm}
            onFormSubmit={handleSubmitCreateForm}
            buttonName="Create"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export { AdminCreateDialog };
