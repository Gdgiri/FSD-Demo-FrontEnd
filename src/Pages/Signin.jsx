import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/userSlice";
import OAuth from "../Components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }

    try {
      dispatch(signInStart());
      const response = await fetch(
        "http://localhost:5000/api/auth/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (!response.ok) {
        // Display error from the server
        dispatch(signInFailure(data.error || "Something went wrong"));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div>
      <div className="min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1 ">
            <div className="font-bold dark:text-white text-4xl">
              <span className="px-2 py-2 bg-gradient-to-r from-violet-600 via-fuchsia-700 to-pink-500 rounded-lg text-white">
                Blogger
              </span>
              Hunt!
            </div>
            <p className="text-sm mt-6">
              You can sign in with your Email and password or use Google.
            </p>
          </div>

          <div className="flex-1">
            <div>
              {errorMessage && (
                <Alert
                  color="failure"
                  icon={HiInformationCircle}
                  withBorderAccent
                  className="mt-5"
                  aria-live="assertive"
                >
                  <span>
                    <span className="font-medium me-2">
                      <span className="text-2xl">😬</span>OOPS!
                    </span>
                    {errorMessage}
                  </span>
                </Alert>
              )}
              <br />
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Email" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div>
                <Label value="Password" />
                <TextInput
                  type="password"
                  placeholder="Enter Your Password"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <Button
                gradientDuoTone="purpleToPink"
                pill
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      color="purple"
                      aria-label="Purple spinner example"
                      size="sm"
                    />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-6">
              <span>Don't Have An Account ? </span>

              <Link to="/signup" className="text-blue-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
