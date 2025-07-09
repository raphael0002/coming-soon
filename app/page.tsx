"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  InstagramIcon,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useEmailJS } from "@/hooks/use-emailjs";
import { validateEmailJSConfig } from "@/lib/emailjs-config";

export default function PlaySyncComingSoon() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [configValid, setConfigValid] = useState(false);

  const {
    sendEmails,
    isLoading,
    error,
    success,
    resetState,
  } = useEmailJS();

  useEffect(() => {
    setIsLoaded(true);

    // Validate EmailJS configuration on load
    const isValid = validateEmailJSConfig();
    setConfigValid(isValid);

    if (!isValid) {
      console.warn(
        "EmailJS not properly configured. Check your environment variables."
      );
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || isLoading || !configValid) return;

    const emailData = {
      email: email.trim(),
      timestamp: new Date().toISOString(),
    };

    console.log("Submitting email:", emailData);

    const emailSent = await sendEmails(emailData);

    if (emailSent) {
      setEmail(""); // Clear form on success
      console.log("Email submission successful");
    }
  };

  // Reset error or success after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => resetState(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success, resetState]);

  return (
    <div className="min-h-screen max-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Configuration Warning - Only show if needed */}
      {!configValid && (
        <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-200 p-2 text-xs sm:text-sm">
          <p className="font-bold">
            ⚠️ EmailJS Configuration Required
          </p>
          <p>
            Please check your environment variables in
            .env.local
          </p>
        </div>
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs - Responsive sizing */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-green-200/30 dark:bg-green-800/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-green-300/20 dark:bg-green-700/15 rounded-full blur-xl animate-float-medium"></div>
        <div className="absolute bottom-20 sm:bottom-40 left-1/4 w-20 sm:w-28 md:w-40 h-20 sm:h-28 md:h-40 bg-green-100/25 dark:bg-green-900/10 rounded-full blur-xl animate-float-fast"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-14 sm:w-20 md:w-28 h-14 sm:h-20 md:h-28 bg-green-200/20 dark:bg-green-800/15 rounded-full blur-xl animate-float-slow"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 dark:opacity-5"></div>

        {/* Mouse Follower - Responsive */}
        <div
          className="absolute w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-radial from-green-300/20 to-transparent dark:from-green-700/10 rounded-full blur-3xl transition-all duration-300 ease-out pointer-events-none"
          style={{
            left:
              mousePosition.x -
              (window.innerWidth < 640
                ? 96
                : window.innerWidth < 768
                ? 144
                : 192),
            top:
              mousePosition.y -
              (window.innerWidth < 640
                ? 96
                : window.innerWidth < 768
                ? 144
                : 192),
          }}
        ></div>
      </div>

      {/* Header - Responsive */}
      <header className="pt-4 sm:pt-8 pb-2 relative z-10 flex-shrink-0">
        <div className="flex justify-center items-center px-4">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-36 h-20 sm:w-40 sm:h-20 md:w-48 md:h-20">
              <Image
                src="/logo-cs3.svg"
                alt="PlaySync"
                width={64}
                height={24}
                className="w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive and centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative z-10 min-h-0">
        <div className="text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto w-full">
          {/* Large Coming Soon Text with Responsive Sizing */}
          <div className="overflow-hidden mb-4 sm:mb-6 md:mb-8">
            <h1
              className={`text-6xl sm:text-6xl md:text-8xl font-light text-gray-900 dark:text-gray-100 tracking-tight transition-all duration-1500 delay-300 leading-tight ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <span className="inline-block font-bold animate-text-shimmer bg-gradient-to-r from-[#7ac143] via-green-500 to-[#7ac143] dark:from-green-500 dark:via-green-300 dark:to-green-500 bg-[length:200%_100%] bg-clip-text text-transparent">
                COMING
              </span>
              <br />
              <span
                className={`inline-block font-bold transition-all duration-1500 delay-500 ${
                  isLoaded
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }`}
              >
                SOON
              </span>
            </h1>
          </div>

          {/* Subtitle - Responsive */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 md:mb-12 font-light animate-typewriter">
              Something extraordinary is on the horizon.
            </p>
          </div>

          {/* Email Signup - Responsive */}
          <div
            className={`max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-6 sm:mb-8 transition-all duration-1000 delay-900 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {success ? (
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-green-50 dark:bg-green-900/50 rounded-full border border-green-200 dark:border-green-700 animate-fade-in">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm md:text-base text-green-700 dark:text-green-300 font-medium">
                  Welcome to the revolution! Check your
                  email.
                </span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-red-50 dark:bg-red-900/50 rounded-full border border-red-200 dark:border-red-700 animate-fade-in mb-4">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">
                  {error}
                </span>
              </div>
            ) : null}

            {!success && (
              <form
                onSubmit={handleSubmit}
                className="group"
              >
                <div className="flex gap-2 sm:gap-3 p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-all duration-300 group-hover:shadow-xl group-focus-within:shadow-xl group-focus-within:scale-105">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="flex-1 h-10 sm:h-12 border-0 rounded-full px-4 sm:px-6 text-sm sm:text-base focus:ring-0 bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-300"
                    required
                    disabled={isLoading || !configValid}
                  />
                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      !email.trim() ||
                      !configValid
                    }
                    className="h-10 sm:h-12 px-4 sm:px-6 md:px-8 bg-[#7ac143] hover:bg-green-500 dark:bg-[#7ac143] dark:hover:bg-green-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-50 group relative overflow-hidden text-sm sm:text-base"
                  >
                    <span
                      className={`transition-all duration-300 ${
                        isLoading
                          ? "opacity-0 translate-x-4"
                          : "opacity-100 translate-x-0"
                      }`}
                    >
                      {isLoading
                        ? "Joining..."
                        : "Notify Me"}
                    </span>
                    <ArrowRight
                      className={`w-3 h-3 sm:w-4 sm:h-4 absolute inset-0 m-auto transition-all duration-300 ${
                        isLoading
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    />
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Mysterious Hint - Responsive */}
          <div
            className={`transition-all duration-1000 delay-1100 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 md:mb-4 text-green-300 dark:text-green-500 opacity-50">
              <span className="inline-block animate-pulse">
                •
              </span>
              <span
                className="inline-block animate-pulse mx-2 sm:mx-3 md:mx-4"
                style={{ animationDelay: "0.5s" }}
              >
                •
              </span>
              <span
                className="inline-block animate-pulse"
                style={{ animationDelay: "1s" }}
              >
                •
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-light animate-pulse">
              Be among the first to discover
            </p>
          </div>
        </div>
      </main>

      {/* Footer with Contact Section - Responsive */}
      <footer
        className={`pb-4 sm:pb-6 md:pb-8 pt-4 sm:pt-4 md:pt-6 relative z-10 flex-shrink-0 transition-all duration-1000 delay-1300 ${
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        {/* Logo and Crafted with precision */}
        <div className="text-center mb-8 sm:mb-10 md:mb-10 flex flex-col items-center justify-center space-y-1 sm:space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase animate-fade-in">
            Crafted with precision
          </p>
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10">
            <Image
              src="/logo-cs1.jpg"
              alt="Play Sync Logo"
              width={40}
              height={40}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Contact Section and Social Links */}
        <div className="flex flex-col-reverse space-y-4 gap-4 sm:space-y-6 md:flex-row md:space-y-0 justify-between items-center px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="flex flex-row sm:flex-row gap-4 items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 md:space-x-8">
            <div className="flex items-center sm:mt-0 mt-2 space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>connectxplaysync@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>+977-9810046115</span>
            </div>
          </div>

          {/* Social Links and Status */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-6">
            <Link
              href="https://www.instagram.com/playsync.co/"
              className="text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
