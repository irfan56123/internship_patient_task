'use client'

import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const OtpForm = () => {
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(t => t - 1), 1000)
      return () => clearInterval(countdown)
    }
  }, [timer])

  const formik = useFormik({
    initialValues: {
      otp: ['', '', '', '']
    },
    validationSchema: Yup.object({
      otp: Yup.array()
        .of(Yup.string().length(1, 'Required'))
        .min(4, 'Enter all digits')
    }),
    onSubmit: values => {
      alert(`OTP entered: ${values.otp.join('')}`)
    }
  })

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...formik.values.otp]
    updatedOtp[index] = value
    formik.setFieldValue('otp', updatedOtp)

    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`)
      if (next) (next as HTMLInputElement).focus()
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white border border-gray-300 shadow-md rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">OTP Verification</h2>
        <p className="text-sm text-gray-600 text-center mb-6">Enter the 4-digit code sent to your mobile</p>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-between gap-2 mb-4">
            {formik.values.otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={digit}
                onChange={e => handleOtpChange(e.target.value, index)}
              />
            ))}
          </div>

          {formik.errors.otp && typeof formik.errors.otp === 'string' && (
            <p className="text-red-500 text-sm text-center mb-2">{formik.errors.otp}</p>
          )}

            <button
          type="submit"
          className="w-full bg-[#00D2FF] hover:bg-[#00bce4] text-white py-2 rounded-md font-semibold text-base" >
          Verify
        </button>
        </form>

        <div className="text-center mt-4">
          {timer > 0 ? (
            <p className="text-sm text-gray-500">Resend OTP in {timer}s</p>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="text-sm text-blue-600 font-medium hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default OtpForm
