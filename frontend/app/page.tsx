import Image from "next/image";
import map from "../public/map.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex relative h-screen flex-col items-center justify-start p-24">
      <Image  
        src={map}
        fill={true}
        style={{objectFit: "contain"}}
        alt="Picture of the world map with pins"
        className="opacity-40"
      />
      <div className="z-20 absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 p-2 flex flex-col items-center justify-center gap-2">
          <h1 className="text-3xl font-bold">TripSage</h1>
          <div className="text-xl font-semibold">Plan your next trip anywhere around the world</div>
      </div>
      <div className="z-20 absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-3/4 p-2 flex flex-col items-center justify-center gap-2 text-white">
        <Link href="/plan">
          <button className="border rounded-full border-transparent bg-yellow-700 p-2">Create New Travel Plan</button>
        </Link>
        <Link href="/past">
          <button className="border rounded-full border-transparent bg-yellow-700 p-2">View Past Plans</button>
        </Link>
      </div>
      <div className="text-xs z-20 absolute bottom-0 right-0 p-2">Photo by <a href="https://unsplash.com/@drwmrk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Andrew Stutesman</a> on <a href="https://unsplash.com/photos/blue-green-and-yellow-world-map-l68Z6eF2peA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      </div>
    </main>
  )
}
