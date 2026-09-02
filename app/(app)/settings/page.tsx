"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import {
  XLogo,
  InstagramLogo,
  YoutubeLogo,
  Globe,
} from "@phosphor-icons/react/dist/ssr";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LANGUAGES = ["English", "Spanish", "French", "Portuguese", "Setswana", "German"];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-[15px] border border-border bg-muted/20 px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

export default function SettingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [displayName, setDisplayName] = useState(user?.name ?? "");
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [language, setLanguage] = useState("English");
  const [x, setX] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [website, setWebsite] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Auto-detect location from the user's network (IP-based, no permission prompt).
    // Client-side call to a free geo API for now — should move behind featheredleaf
    // to avoid CORS/rate-limit issues in production.
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        if (data?.city && data?.country_name) {
          setLocation(`${data.city}, ${data.country_name}`);
        }
      })
      .catch(() => {});
  }, []);

  async function handleSave() {
    setSaving(true);
    await authClient.updateUser({ name: displayName });
    setSaving(false);
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl text-foreground">
        My Account
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Manage your account details.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Display Name">
            <input
              className={inputClass}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Field>
          <Field label="Username">
            <input
              className={inputClass}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Location">
            <input
              className={inputClass}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country"
            />
          </Field>
          <Field label="Language">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className={inputClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Social Networks</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <XLogo className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                className={inputClass}
                value={x}
                onChange={(e) => setX(e.target.value)}
                placeholder="X / Twitter username"
              />
            </div>
            <div className="flex items-center gap-2">
              <InstagramLogo className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                className={inputClass}
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram username"
              />
            </div>
            <div className="flex items-center gap-2">
              <YoutubeLogo className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                className={inputClass}
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="YouTube channel"
              />
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                className={inputClass}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website URL"
              />
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-[15px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}