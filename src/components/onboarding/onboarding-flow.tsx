"use client";

import { useState } from "react";
import { BirthdayStep } from "@/components/onboarding/birthday-step";
import { GenderStep } from "@/components/onboarding/gender-step";
import { ProfileCompletion } from "@/components/onboarding/profile-completion";

type Step = "birthday" | "gender" | "profile";

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>("birthday");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFinish(profile: { displayName: string; bio: string }) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birthday, gender, ...profile }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.message ?? "Something went wrong. Try again.");
        return;
      }

      window.location.href = "/@me";
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "birthday") {
    return (
      <BirthdayStep
        onContinue={(value) => {
          setBirthday(value);
          setStep("gender");
        }}
      />
    );
  }

  if (step === "gender") {
    return (
      <GenderStep
        onContinue={(value) => {
          setGender(value);
          setStep("profile");
        }}
        onBack={() => setStep("birthday")}
      />
    );
  }

  return (
    <ProfileCompletion
      onFinish={handleFinish}
      onBack={() => setStep("gender")}
      loading={loading}
      error={error}
    />
  );
}