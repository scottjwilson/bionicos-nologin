import { useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { withSession } from "../middlewares/session";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function ForgotPassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
        email: values.email,
        url: `${process.env.NEXT_PUBLIC_API_URL}/admin/plugins/users-permissions/auth/reset-password`,
      })
      .then((response) => {
        // Handle success.
        console.log("Your user received an email");
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };
  return (
    <Layout title="Request password reset">
      <div className="max-w-md mx-auto  md:mt-24 mt-16  p-4 rounded-xl bg-white shadow">
        <form className="form-control" onSubmit={onSubmit} method="post">
          <h1 className="text-center mt-2">Request password reset</h1>
          <Link href="/signup">
            <a className="description text-center mt-2">
              Enter your email address to reset your password
            </a>
          </Link>
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-primary"
            type="email"
            placeholder="Your email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />

          <div className="mt-6">
            <button
              type="submit"
              className="btn btn-block text-white"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export const getServerSideProps = withSession((context) => {
  const { req } = context;
  const user = req.session.get("user");
  if (user)
    return {
      redirect: {
        destination: "/account/dashboard",
        permanent: false,
      },
    };
  return {
    props: {},
  };
});