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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F1B] to-[#1A1A2E] text-white flex flex-col items-center justify-between pt-10 pb-20 px-4">
      {/* ICONS */}
      <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
        {/* Ring Icons */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
          <div className="bg-[#1A1A2E] p-4 rounded-full">
            <FaDollarSign className="text-purple-400 text-4xl" />
          </div>
        </div>
        <div className="absolute top-[18%] left-[85%]">
          <div className="bg-[purple] p-4 rounded-full">
            <SiSolana className="text-cyan-400 text-4xl" />
          </div>
        </div>
        <div className="absolute bottom-[18%] left-[85%]">
          <div className="bg-[] p-4 rounded-full">
            <GiVikingShield className="text-purple-300 text-4xl" />
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
          <div className="bg-[purple] p-4 rounded-full">
            <RiFileShieldLine className="text-yellow-400 text-4xl" />
          </div>
        </div>
        <div className="absolute bottom-[18%] left-[0%]">
          <div className="bg-[#1A1A2E] p-4 rounded-full">
            <FiHexagon className="text-purple-300 text-4xl" />
          </div>
        </div>
        <div className="absolute top-[18%] left-[0%]">
          <div className="bg-[purple] p-4 rounded-full">
            <BsFillSlashCircleFill className="text-yellow-400 text-4xl" />
          </div>
        </div>

        {/* Center Spin Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-28 h-28 rounded-full border-4 border-dashed border-purple-500 animate-spin-slow flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-900 rounded-full flex items-center justify-center">
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
        className="mt-20 px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl text-white text-lg hover:scale-105 transition transform duration-200 hover:shadow-lg"
      >
        Get Started
      </button>
    </div>
  );
}