import Image from "next/image";
import Navbar from "@/src/components/nav/Navbar";
import Header from "@/src/components/header/Header"
import InfiniteCarousel from "@/src/components/infiniteCaroussel/InfiniteCarousel";

export default function Home() {
  return (

    <div>
      <Navbar/>
      <Header/>
      <div className="tendanceContainer">
        <h1>Top tendance</h1>
        <InfiniteCarousel/>
      </div>
    </div>
    
  );
}
