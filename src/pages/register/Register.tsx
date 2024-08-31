import { useRef, useState } from "react";

function Register() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="p-5 bg-orange-400 rounded-3xl border-2 border-gray-200 ">
        <div className="text-5xl text-center font-semibold mb-10">Register</div>
        <div className="mt-4">
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[300px]">
              <label className="text-lg font-medium" htmlFor="username">
                Username
              </label>
              <input
                className="w-full rounded-xl p-3 mt-1"
                type="text"
                id="username"
                placeholder="Enter username"
              />
            </div>
            <div className="flex-1 min-w-[300px]">
              <label htmlFor="email" className="text-lg font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="w-full rounded-xl p-3 mt-1"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <label className="text-lg font-medium" htmlFor="password">
                Password
              </label>
              <input
                className="w-full rounded-xl p-3 mt-1"
                type="password"
                id="password"
                placeholder="Enter password"
              />
            </div>
            <div className="flex-1 min-w-[300px]">
              <label className="text-lg font-medium" htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                className="w-full rounded-xl p-3 mt-1"
                type="password"
                id="confirmPassword"
                placeholder="Enter confirme password"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <label className="text-lg font-medium" htmlFor="firstName">
                First name
              </label>
              <input
                className="w-full rounded-xl p-3 mt-1"
                type="text"
                id="firstName"
                placeholder="Enter first name"
              />
            </div>
            <div className="flex-1 min-w-[300px]">
              <label className="text-lg font-medium" htmlFor="lastName">
                Last name
              </label>
              <input
                className="w-full rounded-xl p-3 mt-1"
                type="text"
                id="lastName"
                placeholder="Enter last name"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <label className="text-lg font-medium" htmlFor="firstName">
                Date of birth
              </label>
              <input
                className="w-full rounded-xl p-3 mt-1"
                type="date"
                id="firstName"
                placeholder="Enter first name"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-col  gap-4 py-4">
            {selectedFile && (
              <div className="mt-2 ">
                <p className="text-lg font-medium">Selected avatar image:</p>
                <div className="flex gap-6 mt-5">
                  <p className="text-gray-700">{selectedFile.name}</p>
                  <button onClick={handleRemoveFile}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            <label className="bg-white relative w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-12 w-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
                />
              </svg>
              <span className="mt-2 text-gray-600">
                Drag & drop your avatar image here or click to select
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                ref={fileInputRef}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
