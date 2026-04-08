import { Skeleton } from "@/components/ui/skeleton";

const ManagerDashboardLoading = () => {
  return (
    <div className="p-4 md:p-6 md:max-w-6xl mx-auto w-full min-h-screen">
      {/* Top Page Header matched from page.tsx */}
      <div className="mb-8 space-y-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-4 w-56" />
      </div>

      <div className="space-y-6">
        {/* Dynamic Theme Banner / Welcome Area */}
        <Skeleton className="w-full h-40 md:h-32 rounded-3xl" />

        {/* First Row: 4 Admin Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-xl border bg-card p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="size-8 rounded-full" />
              </div>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>

        {/* Second Row: 3 Admin Balance/Expense Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border bg-card p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="size-8 rounded-full" />
              </div>
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-36" />
            </div>
          ))}
        </div>

        {/* Charts Section: Pie Chart & Bar Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {/* Pie Chart Skeleton */}
          <div className="lg:col-span-2 rounded-xl border bg-card p-6">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="flex justify-center">
              <Skeleton className="size-48 rounded-full" />
            </div>
          </div>
          {/* Bar Chart Skeleton */}
          <div className="lg:col-span-3 rounded-xl border bg-card p-6">
            <Skeleton className="h-6 w-40 mb-6" />
            <Skeleton className="h-48 w-full" />
          </div>
        </div>

        {/* Platform Engagement Block: 2 Cards */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-xl border bg-card p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="size-8 rounded-full" />
              </div>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-28" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardLoading;
