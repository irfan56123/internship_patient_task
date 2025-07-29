'use client';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [remember, setRemember] = useState(false);
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values) => {
      setServerError('');
      setLoading(true);

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          setServerError(data.error || 'Login failed');
        } else {
          // Save to localStorage if Remember Me is checked
          if (remember) {
            localStorage.setItem('user', JSON.stringify(data.user));
          }
          router.push('/doctors'); // Redirect to doctor list/dashboard
        }
      } catch (err) {
        setServerError('Something went wrong. Please try again.');
      }

      setLoading(false);
    },
  });

  return (
    <div className="w-full max-w-md px-6 py-10 shadow-xl rounded-xl border border-gray-200">
      {/* Heading */}
      <h2 className="text-center text-2xl font-semibold mb-2">
        Hi there, welcome to{' '}
        <span className="text-[#00D2FF] font-bold">Shedula</span>
      </h2>
      <p className="text-center text-sm text-gray-600 mb-6">
        Please sign in to continue
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            placeholder="Enter your email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
            placeholder="Enter your password"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-sm text-red-500 mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>

        {/* Remember + Forgot */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
              className="mr-2"
            />
            Remember Me
          </label>
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="text-red-500 text-sm">{serverError}</div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#00D2FF] hover:bg-[#00bce4] text-white py-2 rounded-md font-semibold text-base"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Login with phone number */}
        <Link href="/otp">
          <button
            type="button"
            className="w-full bg-[#00D2FF] hover:bg-[#00bce4] text-white py-2 rounded-md font-semibold text-base mt-2"
          >
            Login With Phone Number
          </button>
        </Link>

        {/* OR Google login */}
        <div className="text-center text-sm text-gray-500 my-2">or</div>

        <button
          type="button"
          className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center text-sm gap-2"
        >
          <Image
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            width={20}
            height={20}
          />
          Sign in with Google
        </button>
      </form>

      {/* Signup prompt */}
      <p className="text-center text-sm mt-6">
        Don't have an account?{' '}
        <a href="#" className="text-blue-500 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
}

