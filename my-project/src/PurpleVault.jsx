import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaDollarSign } from "react-icons/fa";
import { SiSolana } from "react-icons/si";
import { FiHexagon } from "react-icons/fi";
import { BsFillSlashCircleFill } from "react-icons/bs";
import { GiVikingShield } from "react-icons/gi";
import { RiFileShieldLine } from "react-icons/ri";

export default function PurpleVault() {
  const navigate = useNavigate();

  const iconCard = (Icon, iconColor) => (
    <div className="border-2 border-purple-500 bg-black p-4 rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 flex items-center justify-center">
      <Icon className={`${iconColor} text-4xl`} />
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-between pt-10 pb-20 px-4">
      {/* ICONS */}
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
        {/* Ring Icons */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
          {iconCard(FaDollarSign, "text-purple-400")}
        </div>
        <div className="absolute top-[18%] left-[85%]">
          {iconCard(SiSolana, "text-cyan-400")}
        </div>
        <div className="absolute bottom-[18%] left-[85%]">
          {iconCard(GiVikingShield, "text-purple-300")}
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          {iconCard(RiFileShieldLine, "text-yellow-400")}
        </div>
        <div className="absolute bottom-[18%] left-[0%]">
          {iconCard(FiHexagon, "text-purple-300")}
        </div>
        <div className="absolute top-[18%] left-[0%]">
          {iconCard(BsFillSlashCircleFill, "text-yellow-400")}
        </div>

        {/* Center Spin Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-28 h-28 rounded-full border-4 border-purple-500 animate-spin-slow flex items-center justify-center">
            <div className="w-20 h-20 border-2 border-purple-400 bg-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200">
              <FaArrowUp className="text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="text-center mt-10 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Welcome to <span className="text-purple-500">PurpleVault</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-2">
          Send batch payments to multiple wallets
        </p>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-20 px-8 py-3 border-2 border-purple-500 bg-black rounded-xl text-white text-lg 
             hover:scale-105 transition transform duration-200 hover:shadow-lg 
             active:bg-purple-600 active:border-purple-600"
      >
        Get Started
      </button>
    </div>
  );
}