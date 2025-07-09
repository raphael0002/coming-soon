"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  InstagramIcon,
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col relative overflow-hidden">
      {/* Configuration Warning */}
      {!configValid && (
        <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-200 p-4 text-sm">
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
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-green-200/30 dark:bg-green-800/20 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-green-300/20 dark:bg-green-700/15 rounded-full blur-xl animate-float-medium"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-green-100/25 dark:bg-green-900/10 rounded-full blur-xl animate-float-fast"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-green-200/20 dark:bg-green-800/15 rounded-full blur-xl animate-float-slow"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 dark:opacity-5"></div>

        {/* Mouse Follower */}
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-green-300/20 to-transparent dark:from-green-700/10 rounded-full blur-3xl transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Header */}
      <header
        className={`pt-2 pb-2 relative z-10 transition-all duration-1000 `}
      >
        <div className="flex justify-center items-center">
          <div className="flex items-center space-x-3 cursor-pointer">
            <div className="w-42 h-42">
              <Image
                src="/logo-cs3.svg"
                alt="PlaySync"
                width={64}
                height={64}
                className="w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* Large Coming Soon Text with Stagger Animation */}
          <div className="overflow-hidden mb-8">
            <h1
              className={`text-8xl md:text-9xl font-light text-gray-900 dark:text-gray-100 tracking-tight transition-all duration-1500 delay-300 ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }`}
            >
              <span className="inline-block font-bold animate-text-shimmer bg-gradient-to-r from-[#7ac143] via-green-500 to-[#7ac143]  dark:from-green-500 dark:via-green-300 dark:to-green-500 bg-[length:200%_100%] bg-clip-text text-transparent">
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

          {/* Subtitle */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 font-light animate-typewriter">
              Something extraordinary is on the horizon.
            </p>
          </div>

          {/* Email Signup with Enhanced Animations */}
          <div
            className={`max-w-md mx-auto mb-8 transition-all duration-1000 delay-900 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {success ? (
              <div className="flex items-center justify-center space-x-3 p-4 bg-green-50 dark:bg-green-900/50 rounded-full border border-green-200 dark:border-green-700 animate-fade-in">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                <span className="text-green-700 dark:text-green-300 font-medium">
                  Welcome to the revolution! Check your
                  email.
                </span>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center space-x-3 p-4 bg-red-50 dark:bg-red-900/50 rounded-full border border-red-200 dark:border-red-700 animate-fade-in mb-4">
                <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                <span className="text-red-700 dark:text-red-300 font-medium text-sm">
                  {error}
                </span>
              </div>
            ) : null}

            {!success && (
              <form
                onSubmit={handleSubmit}
                className="group"
              >
                <div className="flex gap-3 p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg transition-all duration-300 group-hover:shadow-xl group-focus-within:shadow-xl group-focus-within:scale-105">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="flex-2 h-12 border-0 rounded-full px-6 text-base focus:ring-0 bg-transparent placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all duration-300"
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
                    className="h-12 px-8 bg-[#7ac143] hover:bg-green-500 dark:bg-[#7ac143] dark:hover:bg-green-600 text-white rounded-full font-medium transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-50 group relative overflow-hidden"
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
                      className={`w-4 h-4 absolute inset-0 m-auto transition-all duration-300 ${
                        isLoading
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-4"
                      }`}
                    />
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Mysterious Hint */}
          <div
            className={`transition-all duration-1000 delay-1100 ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="text-6xl mb-4 text-green-300 dark:text-green-500 opacity-50">
              <span className="inline-block animate-pulse">
                •
              </span>
              <span
                className="inline-block animate-pulse mx-4"
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
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light animate-pulse">
              Be among the first to discover
            </p>
          </div>
        </div>
      </main>

      {/* Footer with Slide-up Animation */}
      <footer
        className={`pb-8 pt-8 relative z-10 transition-all duration-1000 delay-1300 ${
          isLoaded
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="text-center mb-8 flex flex-col items-center justify-center space-y-2">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase animate-fade-in">
            Crafted with precision
          </p>
          <Image
            src="/logo-cs1.jpg"
            alt="Play Sync Logo"
            width={40}
            height={40}
          />
        </div>

        <div className="flex flex-col space-y-4  md:flex-row justify-between items-center px-8 max-w-6xl mx-auto">
          <div className="flex space-x-8">
            {["Careers", "Privacy Policy", "Contact"].map(
              (item, index) => (
                <Link
                  key={item}
                  href="#"
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 uppercase tracking-wide hover:tracking-widest transform hover:-translate-y-0.5"
                  style={{
                    animationDelay: `${1.5 + index * 0.1}s`,
                  }}
                >
                  {item}
                </Link>
              )
            )}
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="https://www.instagram.com/playsync.co/"
              className="text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:scale-125 hover:-translate-y-1"
            >
              <InstagramIcon className="w-4 h-4" />
            </Link>

            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide ml-4 animate-pulse">
              Current Status:{" "}
              <span className="text-[#7ac143] dark:text-[#7ac143] font-medium">
                Stealth
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
