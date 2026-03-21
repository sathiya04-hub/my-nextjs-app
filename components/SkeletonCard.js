import LoadingSkeleton from "./LoadingSkeleton";

export function SkeletonCard() {
  return (
    <div style={{ border: "1px solid #ddd", padding: "15px", borderRadius: "8px", marginBottom: "15px" }}>
      <LoadingSkeleton width="60%" height="20px" />
      <LoadingSkeleton width="100%" height="15px" />
      <LoadingSkeleton width="80%" height="15px" />
      <LoadingSkeleton width="50%" height="15px" />
    </div>
  );
}