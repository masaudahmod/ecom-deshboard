import { ModeToggle } from "@/components/ThemeMode";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen p-8 pb-20 grid grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 sm:p-20 font-[var(--font-geist-sans)]">
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5">
        <ModeToggle />
      </div>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <ol className="list-decimal list-inside text-sm text-center sm:text-left font-[var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-gray-200 dark:bg-gray-800 px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        {/* Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-300 font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <Link
            className="capitalize rounded-full border border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="products"
            rel="noopener noreferrer"
          >
            all products
          </Link>
          <Link
            className="rounded-full border border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
