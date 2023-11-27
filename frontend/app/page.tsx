import Image from "next/image";
import map from "../public/map.jpg";

export default function Home() {
  return (
    <main className="flex relative min-h-screen flex-col items-center justify-start p-24">
      <Image  
        src={map}
        fill={true}
        style={{objectFit: "contain"}}
        alt="Picture of the world map with pins"
        className="opacity-40"
      />
      <div className="z-20 p-2 flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold">TripSage</h1>
        <div className="text-xl font-semibold">Plan your next trip anywhere around the world</div>
      </div>
      <div className="text-xs z-20 absolute bottom-0 right-0 p-2">Photo by <a href="https://unsplash.com/@drwmrk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Andrew Stutesman</a> on <a href="https://unsplash.com/photos/blue-green-and-yellow-world-map-l68Z6eF2peA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </div>
    </main>
  )
}
