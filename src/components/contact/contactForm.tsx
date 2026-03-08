import { useState } from "preact/hooks";

export const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const triggerSnackbar = (message: string) => {
    setStatus(message);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 2000);
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const res = await fetch("/.netlify/functions/contact", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        triggerSnackbar("✅ Message sent! Check your inbox.");
        form.reset();
      } else {
        triggerSnackbar("❌ Something went wrong.");
      }
    } catch (err) {
      triggerSnackbar("❌ Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        class="relative overflow-hidden space-y-5 rounded-2xl border border-dark-green/15 bg-white/20 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/30 hover:shadow-lg hover:shadow-dark-green/10 sm:p-7"
      >
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/65 to-transparent"></div>

        <div>
          <label class="mb-1.5 block text-sm font-semibold text-dark-green">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            class="w-full rounded-xl border border-dark-green/15 bg-white/45 px-4 py-3 text-dark-green placeholder:text-ligth-green/60 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent/45"
            placeholder="Your name"
          />
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-semibold text-dark-green">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            class="w-full rounded-xl border border-dark-green/15 bg-white/45 px-4 py-3 text-dark-green placeholder:text-ligth-green/60 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent/45"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="mb-1.5 block text-sm font-semibold text-dark-green">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            class="w-full resize-none rounded-xl border border-dark-green/15 bg-white/45 px-4 py-3 text-dark-green placeholder:text-ligth-green/60 transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent/45"
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          class="btn-shimmer cursor-pointer rounded-full bg-accent px-8 py-3 font-semibold text-ligth-accent transition-all duration-300 hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:shadow-lg hover:shadow-accent/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span class="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
        </button>
      </form>

      {/* Snackbar */}
      <div
        class={`fixed top-10 z-50 bg-dark-green left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-ligth-accent font-bricolage font-medium transition-all duration-500 ${
          showSnackbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        } `}
      >
        {status}
      </div>
    </>
  );
};
