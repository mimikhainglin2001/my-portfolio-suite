import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

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

    // Validate form
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
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success(t("contact.success"));

      // Reset form
      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(t("contact.sendFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container">
        <SectionHeading
          eyebrow={t("contact.subtitle")}
          title={t("contact.title")}
        />

        <div className="mt-12 max-w-2xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft space-y-5"
          >
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">{t("contact.name")}</Label>

              <Input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                maxLength={100}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t("contact.email")}</Label>

              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                maxLength={255}
                required
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">{t("contact.message")}</Label>

              <Textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                maxLength={1000}
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full gap-2"
            >
              <Send className="h-4 w-4" />

              {loading ? t("contact.sending") : t("contact.send")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
