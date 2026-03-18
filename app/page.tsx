import Image from "next/image";
import Link from "next/link";
import Chatbot from "@/components/Chatbot";
import AIChatbot from "@/components/AIChatbot";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="container">  
      <Image src="/banner1.jpg" alt="banner1" width={1200} height={800} style={{ width: "100%", height: "auto" }} />
      <div className="navbar">
        <div className="navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/pagination">
                  Pagination
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/calc">
                  Calculation
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/scroll">
                  Scroll
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/upload">
                  Upload
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/search">
                  Search
                </Link>   
              </li>
              <li className="nav-item">
                <Link href="/login">
                  Login
                </Link>
              </li>
          </ul>
        </div>
        <Chatbot />
        <AIChatbot />
      </div>
    </div>
  );
}
