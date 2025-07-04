import React from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  placeholder,
  multiline = false,
  required = false,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" htmlFor={name}>
        {label}
      </label>
      {multiline ? (
          <textarea
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-300"
          />
      )}
    </div>
  );
};

export default InputField;
