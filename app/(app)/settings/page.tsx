"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import {
  XLogo,
  InstagramLogo,
  YoutubeLogo,
  Globe,
} from "@phosphor-icons/react/dist/ssr";
import { Select } from "@/components/ui/select";

const LANGUAGES = ["English", "Spanish", "French", "Portuguese", "Setswana", "German"];

const inputClass =
  "w-full rounded-[15px] border border-border bg-muted/20 px-3 py-2 text-sm text-foreground outline-none focus:border-primary";

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-8 border-b border-border py-6">
      <div className="w-48 shrink-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { data: session } = authClient.useSession();

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
    await authClient.updateUser({ username });
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

      <div className="mt-8">
        <Row label="Username" hint="You can change it later">
          <input
            className={inputClass}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </Row>

        <Row label="Location">
          <input
            className={inputClass}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
          />
        </Row>

        <Row label="Language">
          <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </Select>
        </Row>

        <Row label="Social Networks">
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
        </Row>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-[15px] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}