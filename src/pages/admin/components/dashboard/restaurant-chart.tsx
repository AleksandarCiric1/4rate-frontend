import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import axios from "axios";
import { UsersChartData, UsersPerMonth } from "@/types/user";
import { RestaurantChartData, RestaurantsPerMonth } from "@/types/restaurant";
import { useTheme } from "@/components/shared/theme-provider";

const chartData = [
  { month: "August", userCount: 120 },
  { month: "September", userCount: 150 },
  { month: "October", userCount: 200 },
  { month: "November", userCount: 170 },
  { month: "December", userCount: 220 },
  { month: "January", userCount: 180 },
  { month: "February", userCount: 160 },
  { month: "March", userCount: 190 },
  { month: "April", userCount: 210 },
  { month: "May", userCount: 230 },
  { month: "June", userCount: 250 },
  { month: "July", userCount: 240 },
];

const chartConfig = {
  userCount: {
    label: "User Count",
    theme: {
      light: "hsl(var(--chart-2))",
      dark: "hsl(var(--chart-4))",
    },
  },
} satisfies ChartConfig;

export function RestaurantChartComponent() {
  const { theme } = useTheme();
  const [chartData, setChartData] = useState<RestaurantChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/analytics/restaurant-stats"
        );
        const data = response.data;
        const transformedData = transformData(data);
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching user creation stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const lineColor =
    chartConfig.userCount.theme?.[
      theme as keyof typeof chartConfig.userCount.theme
    ] || "hsl(var(--chart-5))";

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Restaurant Creation Statistics</CardTitle>
        <CardDescription>
          Showing number of restaurants created over the past year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="min-h-[200px] max-h-[350px] w-full"
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 24,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="restaurantCount"
              type="natural"
              fill={lineColor}
              fillOpacity={0.5}
              stroke={lineColor}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const transformData = (data: RestaurantsPerMonth[]): RestaurantChartData[] => {
  return data.map((item) => ({
    month: new Date(item.year, item.month - 1).toLocaleString("default", {
      month: "short",
    }),
    restaurantCount: item.restaurantCount,
  }));
};
