"use client";
import { scrapeData } from "@/server-actions";
import { LoaderCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  async function handleSubmit() {
    try {
      setIsLoading(true);
      const url = inputRef.current?.value as string;
      const data = await scrapeData(url);

      if (data) {
        sessionStorage.setItem("details", JSON.stringify(data));
        window.location.href = "/details";
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <nav className="bg-white fixed top-0 left-0 w-full py-5 z-10">
        <form className="flex flex-col sm:flex-row gap-2 mx-4">
          <div className="relative flex  items-center ">
            <span className="absolute pl-3">
              <Search className="text-slate-500 h-5 w-5" />
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter website URL"
              required
              className="pl-10 sm:w-96 w-full py-2 bg-neutral-100 outline-none placeholder-slate-500 text-slate-500 rounded-lg border border-neutral-300"
            />
          </div>

          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className="p-2 bg-purple-100 text-purple-700 font-medium rounded-lg flex gap-x-2 justify-center"
          >
            {isLoading && <LoaderCircle className="animate-spin" />}
            Fetch & Save Details
          </button>
        </form>
      </nav>
    </>
  );
}
