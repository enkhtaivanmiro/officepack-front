"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import React, { useState } from "react";
import { Password } from "@/components/ui/Password";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
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
          <h1 className="text-xl font-semibold text-black">Бүртгүүлэх</h1>
        </div>

        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          {/* Username + Email */}
          <div className="w-full flex flex-col">
            <label className="text-sm font-medium mb-1 text-black">
              *Хэрэглэгчийн нэр
            </label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mb-1"
            />
            {errors.username && (
              <span className="text-xs text-red-500 mt-1">
                {errors.username}
              </span>
            )}

            <label className="text-sm font-medium mb-1 text-black mt-4">
              *И-мэйл
            </label>
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mb-1"
            />
            {errors.email && (
              <span className="text-xs text-red-500 mt-1">{errors.email}</span>
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

            <label className="text-sm font-medium mt-4 mb-1 text-black">
              *Нууц үг баталгаажуулах
            </label>
            <Password
              name="passwordConfirm"
              placeholder=""
              value={formData.passwordConfirm}
              onChange={handleInputChange}
            />
            {errors.passwordConfirm && (
              <span className="text-xs text-red-500 mt-1">
                {errors.passwordConfirm}
              </span>
            )}
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white hover:bg-gray-800 transition py-6 rounded-xl font-bold mt-4"
          >
            {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
          </Button>

          <p className="text-sm font-medium mt-1 text-black mb-10">
            Бүртгэлтэй бол{" "}
            <a
              href="/auth/login"
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
