import { addDays, format, startOfDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reservationEndpoints } from "@/environments/api-endpoints";

const DatePickerDemo = () => {
  const [date, setDate] = React.useState<Date>();

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 6);

  const handleTimeSloteChange = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            disabled={(day) => day < today || day > maxDate}
          />
        </PopoverContent>
      </Popover>
      <TimeSlotSelect
        workingHours={{ open: "12:00", close: "18:00" }}
        onChange={handleTimeSloteChange}
      />
    </>
  );
};

interface TimeSlotSelectProps {
  workingHours: { open: string; close: string };

  onChange: (value: string) => void;
}

const generateTimeSlots = (openTime: string, closeTime: string) => {
  const slots = [];
  let [openHour, openMinute] = openTime.split(":").map(Number);
  let [closeHour, closeMinute] = closeTime.split(":").map(Number);

  closeHour = closeHour - 2;

  while (openHour <= closeHour) {
    slots.push(
      `${openHour.toString().padStart(2, "0")}:${openMinute
        .toString()
        .padStart(2, "0")}`
    );

    openHour++;
  }

  return slots;
};

const TimeSlotSelect = ({ workingHours, onChange }: TimeSlotSelectProps) => {
  const slots = generateTimeSlots(workingHours.open, workingHours.close);

  return (
    <div>
      <label className="block text-sm font-medium">Select Time Slot</label>
      <Select onValueChange={onChange}>
        <SelectTrigger className="block w-full border rounded-md">
          <span>{"Select a time slot"}</span>
        </SelectTrigger>
        <SelectContent className="w-full mt-1 border rounded-md">
          {slots.map((slot) => (
            <SelectItem key={slot} value={slot}>
              {slot}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const FormSchema = z.object({
  date: z.date({ required_error: "Please select date" }),
  timeSlot: z.string({
    required_error: "Please select time slot.",
  }),
  guests: z.string({ required_error: "Please select number of guests" }),
});

const slots = generateTimeSlots("12:00", "19:00");

type MakeReservationFormProps = {
  userId: number;
  restaurantId: number;
};

export function MakeReservationForm({
  userId,
  restaurantId,
}: MakeReservationFormProps) {
  const today = startOfDay(new Date());
  const maxDate = addDays(today, 6);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: undefined,
      timeSlot: "",
      guests: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    data.timeSlot = `${data.timeSlot}:00`;
    const formattedDate = data.date.toLocaleDateString("en-CA").split("T")[0];
    let obj = {
      date: formattedDate,
      description: `Number of guests ${data.guests}`,
      time: data.timeSlot,
      userAccountId: userId,
      restaurantId: restaurantId,
    };

    axios
      .post(reservationEndpoints.makeReservation(), obj)
      .then((response) => {
        toast({
          variant: "success",
          title: "Making reservation",
          description: "Successfuly created reservation",
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Making reservation",
          description: "Reservation could not be created!",
        });
        console.log(error);
      });

    form.reset();
  }

  return (
    <div className="w-full border border-gray-300 dark:border-gray-700 p-6 rounded-md">
      <div className="mb-4 text-slate-900 font-medium text-2xl dark:text-white">
        Make reservation
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Date</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                      }}
                      initialFocus
                      disabled={(day) => day < today || day > maxDate}
                    />
                  </PopoverContent>
                </Popover>

                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="timeSlot"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Time slot</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {slots.map((slot, index) => (
                      <SelectItem key={index} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="guests"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Number of guests</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {[1, 2, 3, 4].map((slot, index) => (
                      <SelectItem key={index} value={slot.toString()}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export { DatePickerDemo, TimeSlotSelect };
