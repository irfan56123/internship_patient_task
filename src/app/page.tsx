
"use client";

import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT IMAGE SECTION */}
      <div className="hidden md:flex items-center justify-center bg-blue-100">
        <img src="/login-illustration.png" alt="Login Illustration" className="w-3/4 h-auto" />
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-[#1A202C] mb-6">Login</h2>
          
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email").required("Required"),
              password: Yup.string().min(6, "Minimum 6 characters").required("Required"),
            })}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <Field name="email" type="email" className="input-style" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Field name="password" type="password" className="input-style" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-semibold"
                >
                  Login
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

