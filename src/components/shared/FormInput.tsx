import React, { useState } from "react";
import "./FormInput.css";

type FormInputProps = {
  placeholder: string;
  //   setUsername: (value: string) => void;
  //   refer: any;
  name: string;
  type: string;
  errorMessage?: string | null | undefined;
  id: number;
  label: string;
  value: string;
  onChange: any;
};

const FormInput = (props: FormInputProps) => {
  const [focused, setFocused] = useState(false);
  const handleFocuse = () => {
    setFocused(true);
  };
  const { label, errorMessage, onChange, id, ...inputProps } = props;
  return (
    <div className="flex flex-col gap-1">
      <label className="mt-2">{label}</label>
      <input
        className="px-3 h-10 w-80 rounded-xl"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocuse}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        data-focused={focused.toString()}
      />
      <span className="text-xs w-80 pt-2 text-red-600">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
