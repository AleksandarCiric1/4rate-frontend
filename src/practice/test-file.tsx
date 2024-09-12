import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useState } from "react";

const FileExport = () => {
  //   const [file, setFile] = useState<File | null>(null);
  //   const [filePreview, setFilePreview] = useState<string | null>(null);

  //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files && e.target.files[0]) {
  //       const selectedFile = e.target.files[0];
  //       setFile(selectedFile);

  //       // Preview the image if it's an image file
  //       if (selectedFile.type.startsWith("image/")) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //           setFilePreview(reader.result as string);
  //         };
  //         reader.readAsDataURL(selectedFile);
  //       } else {
  //         setFilePreview(null);
  //       }
  //     }
  //   };

  //   const handleFileRemove = () => {
  //     setFile(null);
  //     setFilePreview(null);
  //   };

  //   return (
  //     <div className="space-y-4">
  //       <Label htmlFor="file-upload" className="font-semibold">
  //         Upload a file
  //       </Label>

  //       <Input
  //         id="file-upload"
  //         type="file"
  //         onChange={handleFileChange}
  //         className="file-input"
  //         accept="image/*"
  //       />

  //       {file && (
  //         <div className="flex items-center space-x-4">
  //           <Input readOnly value={file.name} className="file-name-input" />
  //           <Button
  //             variant="destructive"
  //             onClick={handleFileRemove}
  //             className="remove-file-button"
  //           >
  //             Remove
  //           </Button>
  //         </div>
  //       )}

  //       {filePreview && (
  //         <div className="file-preview mt-4">
  //           <Label>Preview:</Label>
  //           <img
  //             src={filePreview}
  //             alt="File Preview"
  //             className="rounded-md max-w-xs"
  //           />
  //         </div>
  //       )}
  //     </div>
  //   );
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files)); // Convert FileList to Array
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files) {
      const formData = new FormData();
      //   formData.append("files", files); // 'file' should match the parameter name in the Spring backend

      files.forEach((file, index) => {
        formData.append("files", file);
      });

      try {
        const response = await axios.post(
          "http://localhost:8080/v1/images/uploadRestaurantImages/1",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input type="file" onChange={handleFileChange} multiple={true} />
        {/* <input type="file" onChange={handleFileChange} /> */}
        <button
          type="submit"
          className="border-spacing-1 bg-slate-200 p-4 rounded"
        >
          Upload
        </button>
      </form>

      <img src="http://localhost:8080/v1/images/getAvatar/1" alt="aa" />
    </>
  );
};

export { FileExport };
