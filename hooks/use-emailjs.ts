"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "@/lib/emailjs-config";

interface EmailData {
  email: string;
  timestamp?: string;
  userAgent?: string;
  location?: string;
}

interface EmailJSError {
  status?: number;
  text?: string;
  message?: string;
}

export function useEmailJS() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const initializeEmailJS = () => {
    try {
      if (
        !EMAILJS_CONFIG.PUBLIC_KEY ||
        EMAILJS_CONFIG.PUBLIC_KEY === "YOUR_PUBLIC_KEY"
      ) {
        throw new Error("EmailJS public key not configured");
      }
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log("EmailJS initialized successfully");
      return true;
    } catch (err) {
      console.error("EmailJS initialization failed:", err);
      setError("Email service not configured properly");
      return false;
    }
  };

  const sendEmails = async (emailData: EmailData) => {
    setIsLoading(true);
    setError(null);

    if (!initializeEmailJS()) {
      setIsLoading(false);
      return false;
    }

    // Validate emailData.email
    if (
      !emailData.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailData.email)
    ) {
      setError("Invalid email address provided.");
      setIsLoading(false);
      return false;
    }

    let collectionSuccess = false;
    let autoResponseSuccess = false;

    try {
      const userName = emailData.email.split("@")[0];
      const timestamp = new Date().toLocaleString();
      const userAgent =
        typeof window !== "undefined" ? navigator.userAgent : "Unknown";
      const deviceInfo = /Mobile|Android|iPhone|iPad/.test(userAgent)
        ? "Mobile"
        : "Desktop";

      // Validate required config
      if (
        !EMAILJS_CONFIG.SERVICE_ID ||
        !EMAILJS_CONFIG.TEMPLATE_ID ||
        !EMAILJS_CONFIG.AUTORESPONSE_TEMPLATE_ID
      ) {
        throw new Error("EmailJS configuration incomplete");
      }

      // Template parameters for collection email (sent to connectxplaysync@gmail.com)
      const collectionParams = {
        user_email: emailData.email,
        timestamp: timestamp,
        user_device: deviceInfo,
        user_agent: userAgent,
        user_name: userName.charAt(0).toUpperCase() + userName.slice(1),
        join_date: new Date().toLocaleDateString(),
        to_email: "connectxplaysync@gmail.com", // Recipient for new registration
      };

      // Template parameters for auto-response (sent to subscriber)
      const autoResponseParams = {
        user_name: userName.charAt(0).toUpperCase() + userName.slice(1),
        user_email: emailData.email, // For template compatibility
        recipient_email: emailData.email, // For template compatibility
        to_email: emailData.email, // Primary recipient parameter
        timestamp: timestamp,
      };

      console.log("Sending collection email with params:", collectionParams);

      // Send collection email to connectxplaysync@gmail.com
      try {
        const collectionResult = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          collectionParams
        );
        console.log("Collection email sent successfully:", collectionResult);
        collectionSuccess = true;
      } catch (err) {
        // Remove ': EmailJSError' here
        const error = err as EmailJSError; // Narrow type inside catch block
        console.error("Failed to send collection email:", {
          error: error,
          status: error.status,
          text: error.text,
          message: error.message,
        });
        throw new Error("Failed to send collection email");
      }

      console.log(
        "Sending auto-response email with params:",
        autoResponseParams
      );

      // Send auto-response to subscriber
      try {
        const autoResponseResult = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.AUTORESPONSE_TEMPLATE_ID,
          autoResponseParams
        );
        console.log(
          "Auto-response email sent successfully:",
          autoResponseResult
        );
        autoResponseSuccess = true;
      } catch (err) {
        // Remove ': EmailJSError' here
        const error = err as EmailJSError; // Narrow type inside catch block
        console.error("Failed to send auto-response email:", {
          error: error,
          status: error.status,
          text: error.text,
          message: error.message,
        });
        setError(
          "Failed to send auto-response email to subscriber. Please check the EmailJS template (template_kp8yu25) 'To' field is set to {{to_email}}. Collection email sent successfully."
        );
        autoResponseSuccess = false;
      }

      // Consider partial success if collection email was sent
      if (collectionSuccess) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
        return true;
      } else {
        throw new Error("No emails were sent successfully");
      }
    } catch (err) {
      // Remove ': EmailJSError' here
      const error = err as EmailJSError; // Narrow type inside catch block
      console.error("Email sending failed:", {
        error: error,
        status: error.status,
        text: error.text,
        message: error.message,
      });

      let errorMessage = "Failed to send email. Please try again.";

      if (error.status === 400 || error.status === 422) {
        errorMessage =
          "Invalid email configuration. Please ensure the EmailJS template 'To' field is set to {{to_email}} in the dashboard.";
      } else if (error.status === 401) {
        errorMessage = "Email service authentication failed.";
      } else if (error.status === 402) {
        errorMessage = "Email service quota exceeded.";
      } else if (error.text) {
        errorMessage = `Email error: ${error.text}`;
      } else if (error.message) {
        errorMessage = `Email error: ${error.message}`;
      }

      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetState = () => {
    setError(null);
    setSuccess(false);
    setIsLoading(false);
  };

  return {
    sendEmails,
    isLoading,
    error,
    success,
    resetState,
  };
}
