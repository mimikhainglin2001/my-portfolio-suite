import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Send,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Linkedin,
  Github,
  MessageCircle,
} from "lucide-react";
import { z } from "zod";

import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import SectionHeading from "@/components/SectionHeading";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(1000),
});

const Contact = () => {
  const { t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(t("contact.error"));
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      toast.success(t("contact.success"));
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(t("contact.sendFailed"));
    } finally {
      setLoading(false);
    }
  };

  const channels = [
    {
      icon: Mail,
      label: "Email",
      value: "mimikhainglin70@gmail.com",
      href: "mimikhainglin70@gmail.com",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/mimikhainglin",
      href: "https://linkedin.com",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/mimikhainglin2001",
      href: "https://github.com/mimikhainglin2001",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+959 967 297 362",
      href: "https://wa.me/959000000000",
    },
    { icon: MapPin, label: "Location", value: "Yangon, Myanmar", href: null },
    { icon: Phone, label: "Phone", value: "+959 441 386 934", href: null },
  ];

  return (
    <section id="contact" className="section-padding relative">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px]" />
      </div>

      <div className="container relative">
        <SectionHeading title={t("contact.title")} number="06" />

        <div className="mt-12 grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact channels */}
          <div className="glass rounded-2xl border border-border/50 p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">
              {t("contact.subtitle")}
            </h3>
            {channels.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="group flex items-center gap-4 rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm p-4 transition-smooth hover:border-primary/25 hover:bg-primary/[0.02]"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/[0.08] text-primary shrink-0">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-muted-foreground">{label}</p>
                  <p className="text-[15px] font-medium truncate">{value}</p>
                </div>
                {href && (
                  <a
                    href={href}
                    className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="glass rounded-2xl border border-border/50 p-6 space-y-5"
          >
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-[14px] font-medium text-muted-foreground"
              >
                {t("contact.name")}
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                required
                className="w-full rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-primary/[0.02] focus:ring-2 focus:ring-primary/10 outline-none transition-smooth"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-[14px] font-medium text-muted-foreground"
              >
                {t("contact.email")}
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                required
                className="w-full rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-primary/[0.02] focus:ring-2 focus:ring-primary/10 outline-none transition-smooth"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="message"
                className="text-[14px] font-medium text-muted-foreground"
              >
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                required
                className="w-full rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/50 focus:border-primary/40 focus:bg-primary/[0.02] focus:ring-2 focus:ring-primary/10 outline-none transition-smooth resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-primary/90 to-accent px-6 py-3 text-[15px] font-medium text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--glow)/0.3)] disabled:opacity-50 transition-smooth"
            >
              <Send className="h-4 w-4" />
              {loading ? t("contact.sending") : t("contact.send")}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
