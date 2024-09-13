import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabaseClient } from "@/utils/supabaseClient";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface SearchRequestBody {
  searchTerm: string;
}

export async function POST(request: Request) {
  const body: SearchRequestBody = await request.json();
  const query: string = body.searchTerm;

  if (!query) {
    return NextResponse.json({ error: "Empty query" });
  }
  const openAiEmbeddings = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: query,
  });
  const [{ embedding }]: { embedding: number[] }[] = openAiEmbeddings.data;

  console.log("log:", embedding.length); //データの長さチェック

  const { data, error } = await supabaseClient.rpc("vector_search", {
    query_embedding: embedding,
    similarity_threshold: 0.8,
    match_count: 3,
  });

  if (data) {
    return NextResponse.json({ data });
  }
  if (error) {
    console.error("Supabase RPC error:", error.message);
    console.error("Details:", error.details);
    return NextResponse.json({ error });
  }
}
