export default async function DashboardContent({ params }) {
  // ✅ Safe: access uncached data inside async component
  const { slug } = await params; // unwrap the params Promise
  const data = await fetchDashboardData(slug); // can fetch DB or API here

  return (
    <>
        <h1>Dashboard Page</h1>
        <h3>Dynamic Page</h3>
        <h4>Page Name: {slug.join(" / ")}</h4>
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
