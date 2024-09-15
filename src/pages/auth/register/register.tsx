import CardWrapper from "@/components/shared/card-wrapper";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useEffect, useState } from "react";
import {
  RegisterDefaultValues,
  RegisterSchema,
} from "@/schemas/register-schema";
import {
  SelectItem,
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AuthLayout from "../components/auth-layout";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = "4Rate: Register";
  }, []);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: RegisterDefaultValues,
  });

  const { formState } = form;
  const isValid = formState.isValid;

  function onSubmit(values: z.infer<typeof RegisterSchema>) {
    console.log(values);
    setIsLoading(true);

    axios
      .post("http://localhost:8080/v1/userAccounts/createAccount", values)
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          navigate("/login");
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <AuthLayout
        classLayout="flex items-center justify-center overflow-auto"
        sectionLayout="w-full h-full p-5"
      >
        <CardWrapper
          label="Create an account"
          title="Register"
          backButtonHref="/login"
          backButtonLabel="Already have an account? Login here."
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="px-4 space-y-2 "
            >
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field}></Input>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field}></Input>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confrim password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password confirmation"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type="submit" className="mt-6 w-full ">
                  Register
                </Button>
              </div>
            </form>
          </Form>
        </CardWrapper>
      </AuthLayout>
    </>
  );
};
