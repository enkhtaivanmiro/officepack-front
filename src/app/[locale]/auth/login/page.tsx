"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import React, { useState } from "react";
import { Password } from "@/components/ui/Password";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateUsername = (username: string) =>
    /^[A-Za-z0-9]+$/.test(username);

  // Removed API call — now always returns false
  const checkUsername = (username: string) => {
    return false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username) newErrors.username = "Хэрэглэгчийн нэр оруулна уу";
    else if (!validateUsername(formData.username))
      newErrors.username = "Хэрэглэгчийн нэр зөвхөн үсэг болон тоо агуулна";
    else if (checkUsername(formData.username))
      newErrors.username = "Хэрэглэгчийн нэр бүртгэлтэй байна";

    if (!formData.email) newErrors.email = "Имэйл оруулна уу";
    else if (!validateEmail(formData.email))
      newErrors.email = "Хүчингүй и-мэйл";

    if (!formData.password) newErrors.password = "Нууц үг оруулна уу";

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = "Нууц үгээ баталгаажуулна уу";
    } else if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = "Нууц үг таарахгүй байна";
    }

    if (Object.keys(newErrors).length > 0) {
      return setErrors(newErrors);
    }

    // No API — just success message
    alert("Бүртгэл амжилттай (API ашиглаагүй)");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">

      <main className="flex flex-col items-center justify-center flex-1 px-6">
        <div className="flex flex-col items-center mb-8 mt-8">
          <img
            src="/icons/logo.png"
            alt="Tumen-Ekh logo"
            className="w-24 h-24 mb-4"
          />
          <h1 className="text-xl font-semibold text-black">Нэвтрэх</h1>
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          {/* Username + Email */}
          <div className="w-full flex flex-col">
            <label className="text-sm font-medium mb-1 text-black">
              *Хэрэглэгчийн нэр/Имэйл
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black"
            />
            {errors.username && (
              <span className="text-xs text-red-500 mt-1">
                {errors.username}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="w-full flex flex-col">
            <label className="text-sm font-medium mb-1 text-black">
              *Нууц үг
            </label>

            <Password
              name="password"
              placeholder="Нууц үг"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <span className="text-xs text-red-500 mt-1">
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full bg-white border border-gray-400 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-100 transition ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
          </button>

          <p className="text-sm font-medium mt-1 text-black mb-10">
            Бүртгэлгүй бол{" "}
            <a
              href="/auth/signup"
              className="underline font-semibold hover:text-gray-700 text-black"
            >
              ЭНД ДАРНА УУ
            </a>
          </p>
        </div>
      </main>

    </div>
  );
}
