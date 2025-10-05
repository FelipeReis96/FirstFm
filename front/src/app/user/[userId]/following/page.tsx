"use client";
import { useEffect, useState } from "react";
import { authService } from "@/services/authService";

import Header from "../../../header/page";
import Hero from "../../../hero/hero";
import Follows from "../../../components/follows";

export default function FollowingPage() {

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center flex-col">
        <Header />
        <Hero />
      </div>
      <div className="ml-3 mt-7 sm:mt-14 md:pl-30 lg:pl-80">
        <Follows />
      </div>
    </div>
  );
}