"use client";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import { DataType } from "@/types/type";
import { supabaseClient } from "@/utils/supabaseClient";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DataType>();

  useEffect(() => {
    fetchCelebrities();
  }, []);

  const fetchCelebrities = async () => {
    const { data, error } = await supabaseClient
      .from("parson")
      .select("*")
      .order("first_name", { ascending: true });

    if (error) {
      console.log(error);
    } else {
      setSearchResults(data as never[]);
    }
  };

  // const postSetup = async () => {
  //   const res = await fetch("/api/table", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       celebrities: celebrities,
  //     }),
  //   });
  //   const data = await res.json();
  //   return data;
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (searchTerm.trim() === "") {
      alert("入力値が空です");
      await fetchCelebrities();
    } else {
      const semanticSearrch = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchTerm: searchTerm,
        }),
      });
      const semanticSearrchResponse = await semanticSearrch.json();
      if (
        !semanticSearrchResponse.data ||
        (Array.isArray(semanticSearrchResponse.data) &&
          semanticSearrchResponse.data.length === 0)
      ) {
        alert("データが見つかりません");
        window.location.reload();
      }
      setSearchResults(semanticSearrchResponse.data);
    }
  };

  return (
    <div className="py-16 w-full flex justify-center items-center flex-col">
      <form
        onSubmit={handleSubmit}
        className="w-4/5 mb-5 bg-white rounded-lg shadow-md flex md:w-1/2 md:m-16 p-4"
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
          className="px-5 py-2 bg-green-500 hover:bg-green-600 active:bg-green-700 font-bold text-white rounded-lg"
        >
          検索
        </button>
      </form>
      <div className="w-4/5 md:w-1/2 grid gap-8">
        {searchResults ? (
          searchResults.map((profile, index) => (
            <Card key={index} profile={profile} />
          ))
        ) : (
          <p className="text-2xl text-center">ローディング中...</p>
        )}
      </div>
      {/* <button className="mt-10" onClick={postSetup}>
        Setup
      </button> */}
    </div>
  );
}
