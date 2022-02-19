import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { withSession } from "../middlewares/session";
import Layout from "@/components/Layout";
import Link from "next/link";
import { set } from "nprogress";
import toast from "react-hot-toast";
export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = (event) => {
    event.preventDefault();
    if (
      event.currentTarget.password.value !==
      event.currentTarget.confirmPassword.value
    ) {
      alert("Password does not match");
      return;
    }
    const body = {
      username: event.currentTarget.username.value,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    setLoading(true);

    axios
      .post("/api/signup", body)
      .then((user) => {
        console.log(user);
        router.push("/checkout");
      })
      .catch((e) => {
        setLoading(false);

        toast.error(e);
      });
  };
  return (
    <Layout title="Sign Up">
      <div className="max-w-md mx-auto md:mt-24 mt-16  p-4 rounded-xl ">
        <form
          className="form-control"
          onSubmit={onSubmit}
          action="/api/signup"
          method="post"
        >
          <h1 className="text-center mt-2">Sign Up</h1>

          <Link href="/login">
            <a className="description text-center mt-2">
              Already have an account?
              <span className="font-semibold underline ml-1">
                Click here to Login
              </span>
            </a>
          </Link>

          <label htmlFor="email" className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            className="input input-primary"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            name="username"
          />

          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-primary"
            type="email"
            placeholder="Your email"
            autoComplete="email"
            name="email"
          />
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            className="input input-primary"
            type="password"
            placeholder="password"
            autoComplete="new-password"
            name="password"
          />
          <label htmlFor="confirm-password" className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            className="input input-primary"
            type="password"
            placeholder="confirm password"
            autoComplete="passwordConfirm"
            name="confirmPassword"
          />

          <div className="mt-6">
            <button type="submit" className="btn btn-block" disabled={loading}>
              Sign Up
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