"use client";


import { useState } from "react";

export default function SendSmsForm() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const sendSms = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, message }),
      });

      const data = await response.json();
      setStatus(data.message);
    } catch (error) {
      setStatus("Error sending SMS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-black" >Send SMS with AWS SNS</h2>
      <form onSubmit={sendSms} className="space-y-4 text-gray-700 ">
        <input
          type="text"
          placeholder="Enter phone number (e.g. +18005550123)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <textarea
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Send SMS"}
        </button>
      </form>
      {status && <p className="mt-4 text-center text-gray-700 ">{status}</p>}
    </div>
  );
}
