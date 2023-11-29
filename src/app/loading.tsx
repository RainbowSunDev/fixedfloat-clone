import { BsOpencollective } from "react-icons/bs";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="fixed top-0 h-screen w-full bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <span className="h-screen w-full flex justify-center items-center">
          <span className="animate-spin relative flex rounded-sm opacity-75">
            <BsOpencollective className="text-white text-2xl" />
          </span>
        </span>
      </div>
    );
  }