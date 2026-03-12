import { NextResponse } from "next/server";

export async function GET(request) {
  /*return Response.json({ message: "GET request successful" });*/
  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
  ];

  return NextResponse.json(items);
}
