"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useSupabase } from "@/lib/Supabase-provider";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { supabase } = useSupabase();

  const handleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log(data);
      //store data in local storage
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-200">
        <div className="w-full max-w-sm rounded bg-white p-6 shadow-md">
          <h2 className="mb-5 text-center text-2xl font-bold">SAVI Login</h2>
          <div className="mb-4 flex justify-center">
            <Image
              width={512}
              height={512}
              src="/flutter-production-icon.png"
              alt="Platforms on Vercel"
              className="w-48"
            />
          </div>

          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Phone or email
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline hover:bg-black-700 w-full rounded bg-black px-4 py-2 font-bold text-white focus:outline-none"
              onClick={() => handleSignIn()}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
