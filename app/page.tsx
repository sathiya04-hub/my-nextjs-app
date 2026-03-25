import Image from "next/image";
import Link from "next/link";
import Chatbot from "@/components/Chatbot";
import AIChatbot from "@/components/AIChatbot";
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="container">  
          <Image src="/banner1.jpg" alt="banner1" width={1200} height={800} style={{ width: "100%", height: "auto" }} />        
          <Link href="/upload">
            Upload Page
          </Link>
          <Chatbot />
          <AIChatbot />      
    </div>
  );
}
