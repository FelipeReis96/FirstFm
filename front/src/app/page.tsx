"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  return <h1>{msg || "Loading..."}</h1>;
}

