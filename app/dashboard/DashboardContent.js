import Link from "next/link";

export default async function DashboardContent({ params }) {
  const { slug } = await params; // unwrap the params Promise
  const data = await fetchDashboardData(slug); // can fetch DB or API here

  return (
    <>
        <Link href="/dashboard/user">First Level</Link> | <Link href="/dashboard/user/one">Second Level</Link>
        <h1>Dashboard Page</h1>
        <h4>
          Page Name: {slug ? slug.join(" / ") : "Dashboard Home"}
        </h4>
        {/* Display async data */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

// Simulated async data fetch
async function fetchDashboardData(slug) {
  await new Promise((r) => setTimeout(r, 500));
  return { slugPath: slug, message: "Fetched dashboard data" };
}
