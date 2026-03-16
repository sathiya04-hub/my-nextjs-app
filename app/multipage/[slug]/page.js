export default async function Page({ params }) {
  const { slug } = await params;

  return (

    <div className="container">
        <div className="box shadow p-4 mt-3">
            <h3>Dynamic Page</h3>
            <h4>Page Name: {slug}</h4>
        </div>
    </div>

  );
}