interface SkeletonTextProps {
    width?: string;
}

export function SkeletonText({ width = "w-full" }: SkeletonTextProps) {
    return (
        <div
            className={`h-4 bg-[#EDE8DF] animate-pulse rounded-xl ${width}`}
        />
    );
}

export function SkeletonCard() {
    return (
        <div className="bg-[#EDE8DF] animate-pulse rounded-2xl h-[280px]" />
    );
}

export function SkeletonGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>
    );
}
