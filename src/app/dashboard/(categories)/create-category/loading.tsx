import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create Category</h1>

      <div className="w-full max-w-md space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        ))}

        <div className="flex items-center justify-start space-x-4 mt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-5 rounded-full" />
        </div>

        <Skeleton className="h-10 w-full rounded-md mt-4" />
      </div>
    </div>
  );
}