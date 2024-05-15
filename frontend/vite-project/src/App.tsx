import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email: email,
      message: message,
    };

    try {
      // Make the POST request and wait for the response

      // npm run dev -- --host      =>> use this command to run the server on local network

      // const res = await axios.post("http://192.168.0.117:5000/send-email", data);      //use this for local network (that is if want to test on anotehr device on local network)   
      const res = await axios.post("http://localhost:5000/send-email", data);
      console.log(res.data); // Log the response data
      setSent(true); // Update the sent state

      // Optional: You can display a success message to the user
      // and reset the form fields here if needed
    } catch (error) {
      // If an error occurs during the request, log the error and handle it
      console.error(error);
      // Optional: You can display an error message to the user
      // and allow them to try sending the email again
    }
  };
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4">Contact Form</h1>
      {sent ? (
        <div>
          <p className="text-green-500 py-6">
            Your email has been Sent!!..please visit again.
          </p>
          <button
            onClick={() => setSent(false)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
          >
            Click here to send another email
          </button>{" "}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md">
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-400 rounded-sm px-3 py-2 mb-2 block w-full"
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="border border-gray-400 rounded-sm px-3 py-2 mb-2 block w-full"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm"
          >
            Send Email
          </button>{" "}
        </form>
      )}
    </div>
  );
}

export default App;
