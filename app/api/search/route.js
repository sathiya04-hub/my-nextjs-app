export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const items = [
    { name: "Apple" },
    { name: "Banana" },
    { name: "Orange" },
    { name: "Mango" },
    { name: "Pineapple" },
  ];

  const results = items.filter((item) =>
    item.name.toLowerCase().includes(q.toLowerCase())
  );

  return Response.json(results);
}