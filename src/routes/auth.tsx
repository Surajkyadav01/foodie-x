import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, KeyRound } from "lucide-react";
import { useApp } from "@/lib/app-store";
import { toast } from "sonner";
import { Logo } from "@/components/app/Logo";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const { login } = useApp();
  const navigate = useNavigate();

  const sendOtp = () => {
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Enter a valid 10-digit number");
      return;
    }
    toast.success("OTP sent! Use 1234 for demo");
    setStep("otp");
  };

  const verify = () => {
    if (otp === "1234") {
      login(phone);
      toast.success("Welcome to FoodieX!");
      navigate({ to: "/" });
    } else {
      toast.error("Invalid OTP. Try 1234");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 animate-fade-in">
      <div className="w-full max-w-md bg-card rounded-3xl border shadow-card p-8">
        <div className="text-center mb-6">
          <Logo size="lg" />
          <h1 className="text-2xl font-bold mt-4">{step === "phone" ? "Login or Sign up" : "Enter OTP"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {step === "phone" ? "We'll send a one-time password" : `Sent to +91 ${phone}`}
          </p>
        </div>

        {step === "phone" ? (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border rounded-xl px-3 focus-within:ring-2 focus-within:ring-brand">
              <Phone className="size-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">+91</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="Mobile number"
                className="flex-1 py-3 bg-transparent outline-none"
                inputMode="numeric"
              />
            </div>
            <button onClick={sendOtp} className="w-full py-3 rounded-xl gradient-brand text-brand-foreground font-semibold">
              Send OTP
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 border rounded-xl px-3 focus-within:ring-2 focus-within:ring-brand">
              <KeyRound className="size-5 text-muted-foreground" />
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder="4-digit OTP (try 1234)"
                className="flex-1 py-3 bg-transparent outline-none tracking-widest text-center text-lg"
                inputMode="numeric"
              />
            </div>
            <button onClick={verify} className="w-full py-3 rounded-xl gradient-brand text-brand-foreground font-semibold">
              Verify & Continue
            </button>
            <button onClick={() => setStep("phone")} className="w-full text-sm text-muted-foreground hover:text-brand">
              Change number
            </button>
          </div>
        )}

        <p className="text-xs text-center text-muted-foreground mt-6">
          By continuing you agree to our Terms & Privacy Policy
        </p>
      </div>
    </div>
  );
}
