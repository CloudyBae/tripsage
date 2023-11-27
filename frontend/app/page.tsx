import Image from "next/image";
import map from "../public/map.jpg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image  
        src={map}
        fill={true}
        style={{objectFit: "contain"}}
        alt="Picture of the world map with pins"
      />
      <div className="text-sm">Photo by <a href="https://unsplash.com/@drwmrk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Andrew Stutesman</a> on <a href="https://unsplash.com/photos/blue-green-and-yellow-world-map-l68Z6eF2peA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </div>
    </main>
  )
}
