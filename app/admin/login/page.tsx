"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router                    = useRouter();
  const [password, setPassword]   = useState("");
  const [error,    setError]      = useState("");
  const [loading,  setLoading]    = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Incorrect password. Try again.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111111]">
      <div className="w-full max-w-sm rounded-[2rem] bg-[#222222] p-8 shadow-sm border border-white/20">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#4A90C4] text-sm font-bold text-white">
            SD
          </div>
          <h1 className="mt-4 text-xl font-extrabold text-[#F0F0F0]">Admin Login</h1>
          <p className="mt-1 text-sm text-[#A8B4BC]">Stitch Depot Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <label className="mb-1 block text-xs font-semibold text-[#A8B4BC]">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            autoFocus
            className="w-full rounded-2xl border border-white/20 bg-[#222222] px-4 py-3 text-sm text-[#F0F0F0] placeholder:text-[#A8B4BC]/50 outline-none focus:border-[#4A90C4]"
          />

          {error && (
            <p className="mt-3 text-sm font-semibold text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className={`mt-5 w-full rounded-2xl py-3 text-sm font-bold text-white transition ${
              loading || !password
                ? "cursor-not-allowed bg-[#444]"
                : "bg-[#4A90C4] hover:from-[#5B9BD5] hover:to-[#0C2340]"
            }`}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
