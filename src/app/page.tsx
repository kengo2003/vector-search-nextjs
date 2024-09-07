"use client";
import React, { useState, useEffect } from "react";
import { celebrities } from "@/app/data";
import Card from "@/components/Card";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchCelebrities();
  }, []);

  const fetchCelebrities = async () => {
    const { data, error } = await supabaseClient
      .from("celebrities")
      .select("*")
      .order("first_name", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      console.log(data);
      setSearchResults(data as never[]);
    }
  };

  const handleChange = (event: any) => {
    setSearchTerm(event.target.value);
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="py-16 w-full flex justify-center items-center bg-gray-100 flex-col">
      <form
        onSubmit={handleSubmit}
        className="m-16 bg-white rounded-lg shadow-md flex w-full md:w-1/2 p-4"
      >
        <input
          type="text"
          placeholder="入力してください"
          className="flex-grow text-lg font-light focus:outline-none"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="px-5 py-2 bg-green-500 font-bold text-white rounded-lg"
        >
          検索
        </button>
      </form>
      <div className="w-1/2 grid gap-8">
        {celebrities.map((profile, index) => (
          <Card key={index} profile={profile} />
        ))}
      </div>
      <button className="mt-10">Setup</button>
    </div>
  );
}
