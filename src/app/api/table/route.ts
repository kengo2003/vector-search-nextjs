// import { NextRequest, NextResponse } from "next/server";
// import OpenAI from "openai";
// import { supabaseClient } from "@/utils/supabaseClient";

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   const { celebrities } = body;

//   const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
// async function generateOpenAIEmbeddings(profile: any) {//anyは修正する必要あり
//     const textToEmbed = Object.values(profile).join(" ");
//     const response = await openai.embeddings.create({
//       model: "text-embedding-ada-002",
//       input: textToEmbed,
//     });
//     return response.data[0].embedding;
//   }
//   try {
//     const processedDataArray = await Promise.all(
//       celebrities.map(async (item: any) => {
//         const embeddings = await generateOpenAIEmbeddings(item);
//         const modifiedItem = { ...item, embeddings };
//         const { data, error } = await supabaseClient
//           .from("parson")
//           .upsert([modifiedItem])
//           .select();

//         if (error) {
//           console.error("Error inserting data into Supabase:", error.message);
//           return NextResponse.json({
//             success: false,
//             status: 500,
//             result: error,
//           });
//         }
//         return NextResponse.json({ success: true, status: 200, result: data });
//       })
//     );

//     const hasError = processedDataArray.some((result) => !result.success);
//     if (hasError) {
//       return NextResponse.json({
//         error: "One or more insertions failed",
//         status: 500,
//       });
//     }

//     return NextResponse.json({
//       status: 200,
//       success: true,
//       results: processedDataArray,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       status: 500,
//       success: false,
//       results: error,
//       message: "Internal Server Error",
//     });
//   }
// }
