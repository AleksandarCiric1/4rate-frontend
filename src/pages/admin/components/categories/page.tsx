import { useEffect, useState } from "react";
import { Category, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";
import { CategoryCreateDialog, CategoryEditDialog } from "./category-dialogs";
import { CategoryEditFormData } from "@/types/category";

export default function CategoriesTable() {
  const [isEditDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [data, setData] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Category[]>(
          "http://localhost:8080/v1/categories/getAll"
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

  const handleActions = (id: number, action: string) => {
    let apiPath = `http://localhost:8080/v1/categories/${action}/${id}`;
    axios
      .put(apiPath)
      .then((response) => {
        console.log(response);
        setData(
          (prevData) =>
            prevData?.map((category) => {
              if (category.id === id) {
                if (action === "activate") {
                  return { ...category, status: true };
                } else if (action === "block") {
                  return { ...category, status: false };
                }
              }
              return category;
            }) || null
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddCategory = (newCategory: Category) => {
    setData((prevData) =>
      prevData ? [...prevData, newCategory] : [newCategory]
    );
    setCreateDialogOpen(false);
  };

  const handleEditCategory = (category: Category) => {
    setCategoryToEdit(category);
    console.log(categoryToEdit);
    setEditDialogOpen(true);
  };

  const handleEdit = (formData: CategoryEditFormData) => {
    if (categoryToEdit) {
      categoryToEdit.name = formData.name;
      setData(
        (prevData) =>
          prevData?.map((category) => {
            if (category.id === categoryToEdit.id) return categoryToEdit;
            return category;
          }) || null
      );
    }
    setEditDialogOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Categories</h1>
      </div>
      <div className="container mx-auto py-6">
        <DataTable
          columns={columns({
            onAction: handleActions,
            onEdit: handleEditCategory,
          })}
          data={data}
        >
          <CategoryCreateDialog
            onCreate={handleAddCategory}
            isOpen={isCreateDialogOpen}
            onOpenChange={setCreateDialogOpen}
          />
          {categoryToEdit && (
            <CategoryEditDialog
              category={categoryToEdit}
              isOpen={isEditDialogOpen}
              onOpenChange={setEditDialogOpen}
              onEdit={handleEdit}
            />
          )}
        </DataTable>
      </div>
    </div>
  );
}
