import { useEffect, useState } from "react";
import { User, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";

export default function UsersTable() {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>(
          "http://localhost:8080/v1/userAccounts/getAllAccounts"
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleActions = (id: number, path: string, action: string) => {
    const apiPath = `http://localhost:8080/v1${path}/${id}`;
    axios
      .put(apiPath)
      .then((response) => {
        console.log(response);
        setData(
          (prevData) =>
            prevData?.map((user) => {
              if (user.id === id) {
                if (action === "confirm") return { ...user, confirmed: true };
                else if (action === "activate")
                  return { ...user, status: "active" };
                else if (action === "suspend")
                  return { ...user, status: "suspended" };
                else return { ...user, status: "block" };
              }
              return user;
            }) || null
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>{error}</p>;

  return (
    <div>
      <h1 className="font-bold text-2xl">Users</h1>
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns({
            onAction: handleActions,
          })}
          data={data}
        />
      </div>
    </div>
  );
}
