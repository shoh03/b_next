import { Metadata } from "next";
import "./globals.css";
import "@/styles/tailwind/tailwind.theme.css"

import { pretendard } from "@/styles/font/font";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Next Project",
  description: "재밌게 공부하는 Next 16!",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn(pretendard.variable, "font-sans", geist.variable)}>
      <body className="font-pretendard">
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
