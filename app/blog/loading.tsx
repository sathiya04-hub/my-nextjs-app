import { SkeletonCard } from "../../components/SkeletonCard";

export default function Loading() {
  return (
    <section className="mt-3">
      <div className="mt-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />          
        ))}
      </div>
    </section>
  )
}