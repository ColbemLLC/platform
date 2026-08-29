"use client";

import { useState } from "react";
import { RegisterIntro } from "@/components/auth/register-intro";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  const [step, setStep] = useState<"intro" | "form">("intro");

  if (step === "intro") {
    return <RegisterIntro onContinue={() => setStep("form")} />;
  }

  return <RegisterForm />;
}