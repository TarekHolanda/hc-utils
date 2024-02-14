export default function Loading() {
    return (
        <div className="flex flex-col flex-1 gap-4 justify-center items-center">
            <div className="flex flex-col gap-2 justify-center items-center">
                <div className="animate-pulse rounded-md bg-zinc-100 h-6 w-[140px]" />
                <div className="h-[1px] bg-white w-[140px]" />
            </div>
            <div className="animate-pulse rounded-md bg-zinc-100 h-4 w-[200px]" />
        </div>
    );
}
