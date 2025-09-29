import { useState } from "preact/hooks";

export const ContactForm = () => {
  const [status, setStatus] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const triggerSnackbar = (message: string) => {
    setStatus(message);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 2000);
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
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
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} class="space-y-5">
        <div>
          <label class="block text-dark-green font-medium mb-2 text-sm">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            class="w-full px-4 py-3 rounded-lg text-ligth-green focus:ring-2 focus:ring-accent-500 outline-2 outline-ligth-green"
            placeholder="Your name"
          />
        </div>

        <div>
          <label class="block text-dark-green font-medium mb-2 text-sm">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            class="w-full px-4 py-3 rounded-lg text-ligth-green focus:ring-2 focus:ring-accent-500 outline-2 outline-ligth-green"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-dark-green font-medium mb-2 text-sm">
            Message
          </label>
          <textarea
            name="message"
            rows={4}
            required
            class="w-full px-4 py-3 rounded-lg text-ligth-green focus:ring-2 focus:ring-accent-500 outline-2 outline-ligth-green"
            placeholder="Write your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          class="mx-auto cursor-pointer relative overflow-hidden rounded-full bg-accent text-dark-green px-5 py-2.5 transition-all duration-300 hover:ring-2 hover:ring-accent hover:ring-offset-2 font-semibold"
        >
          <span class="relative">Send Message</span>
        </button>
      </form>

      {/* Snackbar */}
      <div
        class={`fixed top-10 z-50 bg-accent left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-dark-green font-bricolage transition-all duration-500 ${showSnackbar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } `}
      >
        {status}
      </div>
    </>
  );
};
