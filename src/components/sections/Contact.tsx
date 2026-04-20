import { useState } from "react";
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
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
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(t("contact.error"));
      return;
    }
    setLoading(true);
    // Frontend-only submission (no backend wired yet)
    await new Promise((r) => setTimeout(r, 800));
    toast.success(t("contact.success"));
    setForm({ name: "", email: "", message: "" });
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container">
        <SectionHeading eyebrow={t("contact.subtitle")} title={t("contact.title")} />

        <div className="mt-12 grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <aside className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-hero text-primary-foreground shadow-glow">
              <h3 className="font-display text-xl font-semibold mb-4">Let's connect</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 opacity-80" />
                  <a href="mailto:hello@yourname.dev" className="hover:underline">hello@yourname.dev</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 opacity-80" />
                  Yangon, Myanmar
                </li>
              </ul>
              <div className="flex gap-2 mt-6 pt-6 border-t border-primary-foreground/20">
                {[
                  { Icon: Github, href: "https://github.com", label: "GitHub" },
                  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="p-2.5 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-smooth"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-soft space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="name">{t("contact.name")}</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                maxLength={100}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("contact.email")}</Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                maxLength={255}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">{t("contact.message")}</Label>
              <Textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                maxLength={1000}
                required
              />
            </div>
            <Button type="submit" size="lg" disabled={loading} className="w-full gap-2">
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
