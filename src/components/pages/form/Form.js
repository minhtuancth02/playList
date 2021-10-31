import React , {useState} from 'react'
import { isPhone, isEmail, isName , isValue } from '../../validations';
import TextField from './text-field/index'
import { DropList } from './DropList';

const contactInfo = {
    "full name": { valid: [isName] },
    email: { valid: [isEmail], type: "email", placeHolder: "abc@mail.com" },
    phone: { valid: [isPhone], type: "number", placeHolder: "(+222) 222-2222" },
    name: { valid: [isValue], type: "select" },
    region: { valid: [isValue], type: "select" },
};

export default function Form() {
  
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function formValid(obj = contactInfo, key, value) {
    return obj[key].valid
      .map((valid) => valid(value))
      .filter((value) => value.length !== 0);
  }

  // Event Delegation 
  function handleSubmit(event) {
    event.preventDefault();
    // Uncontrolled input
    const formData = new Promise((res, rej) => {
      setIsLoading(true);
      const Data = new FormData(event.currentTarget);
      const error = [];
      for (const [key, value] of Data.entries()) {
        error.push(formValid(contactInfo, key, value));
      }
      setTimeout(() => {
        if (error.flat().length > 0) {
          rej(alert("Error : Values Is Required"));
        } else {
          res(Data.entries());
          setIsLoading(false);
        }
      }, 1000);
    });

    formData
      .then((data) => Object.fromEntries(data))
      .then((objValues) => setFormValues({ ...objValues }))
      .finally(() => setIsLoading(false));
  }

  // console.log(Object.entries(formValues));

  return (
    <div className="w-2/3 mx-auto my-4 p-8">
      <form className="my-5" onSubmit={handleSubmit}>
        <div className="shadow-xl p-7 bg-gray-100">
          <div className="w-full flex justify-center">
            <ul className="flex">
              <li className="text-5xl text-blue-400">&middot;</li>
              <li className="text-5xl text-gray-400">&middot;</li>
              <li className="text-5xl text-gray-400">&middot;</li>
            </ul>
          </div>

          <div className="my-8">
            <h2 className="my-5 text-2xl font-mono text-purple-500 font-medium">
              Contact Info
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 my-4">
              {Object.entries(contactInfo).map(
                ([name, value]) =>
                  value["type"] !== "select" && (
                    <TextField
                      name={name}
                      valid={value["valid"]}
                      type={value["type"]}
                      placeHolder={value["placeHolder"]}
                    />
                  )
              )}
            </div>
          </div>

          <div className="my-8">
            <h2 className="my-5 text-2xl font-mono text-purple-500 font-medium">
              Tour Info
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 my-4">
              <DropList name="region" />
              <DropList name="name" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 my-4">
            {Object.entries(formValues).map(([name, value]) => (
              <div className="my-3 text-sm font-mono font-extralight">
                <h3>{name}</h3>
                <p>{value}</p>
              </div>
            ))}
          </div>

          <button
            className="px-5 py-2 font-mono bg-purple-500 text-white font-semibold border rounded-md"
            type="submit"
            disabled={isLoading}
          >
            {isLoading === true ? `Loading...` : `Register`}
          </button>
        </div>
      </form>
    </div>
  );
}
