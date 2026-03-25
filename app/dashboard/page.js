import { Suspense } from "react";
import DashboardContent from "./DashboardContent";
export default function Page({ params }) {
  return (
    <div className="container">
      <div className="box shadow p-4 mt-3">
        <Suspense fallback={<div>Loading Home dashboard...</div>}>
          <DashboardContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}