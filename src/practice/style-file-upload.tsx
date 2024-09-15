import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Trash, Trash2, Upload } from "lucide-react";
import { useState } from "react";

const FileUpload = ({ multiple = true }) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(multiple ? selectedFiles : [selectedFiles[0]]);
    }
  };

  const handleFileDelete = (fileName: string) => {
    setFiles(
      (prevFiles) => prevFiles?.filter((file) => file.name !== fileName) || []
    );
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <label
        htmlFor="file-upload"
        className={clsx(
          "flex flex-col items-center justify-center w-full  p-6",
          "border-2 border-dashed border-gray-300 rounded-md",
          "hover:bg-gray-100 cursor-pointer transition duration-200"
        )}
      >
        <Upload className="w-10 h-10 text-gray-500" />
        <span className="mt-2 text-sm text-gray-600">
          {multiple ? "Upload files here" : "Upload file here"}
        </span>

        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple={multiple}
        />
      </label>
      {files.length > 0 && (
        <div className="flex flex-col  w-full max-w-lg">
          {files.map((file) => (
            <div key={file.name} className="flex items-center justify-between">
              <span className="text-gray-800">{file.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleFileDelete(file.name)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { FileUpload };
