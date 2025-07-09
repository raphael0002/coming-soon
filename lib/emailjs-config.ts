// EmailJS Configuration
export const EMAILJS_CONFIG = {
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
  TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
  AUTORESPONSE_TEMPLATE_ID:
    process.env.NEXT_PUBLIC_EMAILJS_AUTORESPONSE_TEMPLATE_ID || "",
};

// Validate configuration
export const validateEmailJSConfig = () => {
  const missing = [];

  if (!EMAILJS_CONFIG.PUBLIC_KEY) missing.push("PUBLIC_KEY");
  if (!EMAILJS_CONFIG.SERVICE_ID) missing.push("SERVICE_ID");
  if (!EMAILJS_CONFIG.TEMPLATE_ID) missing.push("TEMPLATE_ID");
  if (!EMAILJS_CONFIG.AUTORESPONSE_TEMPLATE_ID)
    missing.push("AUTORESPONSE_TEMPLATE_ID");

  if (missing.length > 0) {
    console.error("Missing EmailJS configuration:", missing);
    return false;
  }

  console.log("EmailJS configuration validated successfully");
  return true;
};

// Email Templates for reference
export const EMAIL_TEMPLATES = {
  // Template for collecting subscriber emails (sent to you)
  COLLECTION: {
    subject: "🚀 New PlaySync Subscriber Alert!",
    template: `
    New subscriber joined the PlaySync waiting list!
    
    📧 Email: {{user_email}}
    🕐 Timestamp: {{timestamp}}
    📱 Device: {{user_device}}
    🌍 User Agent: {{user_agent}}
    
    ---
    Subscriber Details:
    • Name: {{user_name}}
    • Join Date: {{join_date}}
    • Source: Coming Soon Page
    
    ---
    PlaySync Admin Dashboard
    🚀 Building the future, one subscriber at a time.
    
    Total Subscribers: Growing...
    Status: Stealth Mode Active
        `,
  },

  // Auto-response template (sent to subscriber)
  AUTORESPONSE: {
    subject: "🔥 Welcome to PlaySync - The Revolution Begins",
    template: `
    Hi {{user_name}},
    
    🚀 WELCOME TO THE INNER CIRCLE
    
    You've just secured your spot in something extraordinary. PlaySync isn't just another app – it's a revolution waiting to happen.
    
    🎯 WHAT HAPPENS NEXT:
    • You'll be among the FIRST to get early access
    • Exclusive behind-the-scenes updates
    • Special launch day privileges
    • VIP treatment when we go live
    
    🔮 THE MYSTERY DEEPENS:
    We're crafting something that will change everything. The pieces are falling into place, and you're now part of the story.
    
    ⚡ STAY ALERT:
    • Keep this email safe
    • Check your inbox regularly
    • The next message could change everything
    • Something big is brewing...
    
    🌟 EXCLUSIVE INSIDER STATUS:
    You're now part of an elite group of visionaries who recognized potential before the world caught on. When PlaySync launches, you'll have front-row seats to the revolution.
    
    The countdown has begun.
    
    ---
    The PlaySync Team
    🌟 "Where Innovation Meets Anticipation"
    
    P.S. Something extraordinary is coming. You'll want to be ready.
    
    ---
    Follow our journey:
    🐦 Twitter: @PlaySyncApp
    📸 Instagram: @PlaySyncOfficial
    💼 LinkedIn: PlaySync
    
    © 2024 PlaySync. All rights reserved.
    This email was sent to {{to_email}} because you joined our exclusive waiting list.
        `,
  },
};
