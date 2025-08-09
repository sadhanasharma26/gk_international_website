"use client";
import { useState } from "react";
import { company } from "@/config/company";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    try {
      const form = event.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());
      // Placeholder: Wire to an API route or service like Formspree/HubSpot later
      console.log("Inquiry submitted", data);
      await new Promise((r) => setTimeout(r, 600));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-semibold">Contact Us</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">
        Share your requirements and our team will get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <div className="grid gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="message" className="text-sm font-medium">
            Message / Requirements
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 w-fit rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
        >
          {status === "loading" ? "Submitting..." : "Submit Inquiry"}
        </button>
        {status === "success" && (
          <p className="text-sm text-green-600">Thanks! We’ll reach out soon.</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
        )}
      </form>

      <div className="mt-12 grid gap-4 text-sm text-neutral-600 dark:text-neutral-300">
        <p>
          Address: {company.address}, {company.city}, {company.state}-
          {company.postalCode}, {company.country}
        </p>
        <p>CEO: {company.ceo}</p>
        <p>GST: {company.gstNumber}</p>
      </div>
    </div>
  );
}


