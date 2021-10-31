import React, { useState }from 'react';

// uncontrolled input
export default function TextField({
  name,
  type = "text",
  valid,
  placeHolder = "Values is required...",
}) {
  
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  console.log(value);

  function label(string) {
    return string
      .split(" ")
      .map((word) => {
        const firstLetter = word.charAt(0).toUpperCase();
        const rest = word.slice(1);
        return `${firstLetter}${rest}`;
      })
      .join(" ");
  };

  function handleChange({ target: { value } }) {
    setValue(value);
  }

  const errorMessage = valid.map((valid) => valid(value)).join(" ,");
  // console.log(errorMessage);

  return (
    <div className="mr-2 mb-5" key={name}>
      <label
        className={`ml-1 ${isFocus ? `text-blue-500` : `text-gray-400`} text-l font-sans`}
        htmlFor={name}
      >
        {label(name)}
      </label>
      <input
        className="border focus:border-blue-500 rounded-sm font-extralight font-sans p-2 my-2 w-full shadow-md"
        type={type}
        id={name}
        name={name}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        placeholder={`${placeHolder}`}
        onChange={(e) => handleChange(e)}
        autoComplete="off"
      />
      {errorMessage && (
        <p className="text-left font-sans text-xs text-red-600">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
