import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  subject: yup.string().required("Please select a subject"),
  message: yup.string().required("Message cannot be empty"),
  phone: yup.string().matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
});

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("https://jsonplaceholder.typicode.com/posts", data);
      setResponse("Message Sent Successfully!");
    } catch (error) {
      setResponse("Failed to send message!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <input type="text" {...register("name")} placeholder="Name" />
      <p>{errors.name?.message}</p>

      <input type="email" {...register("email")} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <select {...register("subject")}>
        <option value="">Select Subject</option>
        <option value="coach">Coach</option>
        <option value="institute">Institute/Organisation</option>
        <option value="trainee">Trainee/Coach</option>
      </select>
      <p>{errors.subject?.message}</p>

      <textarea {...register("message")} placeholder="Message"></textarea>
      <p>{errors.message?.message}</p>

      <input type="text" {...register("phone")} placeholder="Phone (Optional)" />
      <p>{errors.phone?.message}</p>

      <button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Submit"}
      </button>

      {response && <p>{response}</p>}
    </form>
  );
};

export default ContactForm;
