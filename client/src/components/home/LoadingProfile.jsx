function LoadingProfile() {
    return (
        <div className="w-full max-w-4xl mx-auto bg-[#131316] text-white p-6 sm:p-8 rounded-2xl border border-[#2c2c30] shadow-2xl mt-6 animate-pulse">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-36 h-36 rounded-full bg-[#2c2c30]" />
                <div className="flex-1 space-y-3">
                    <div className="w-40 h-6 bg-[#2c2c30] rounded" />
                    <div className="w-32 h-5 bg-[#2c2c30] rounded" />
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-14 bg-[#2c2c30] rounded-xl" />
                ))}
            </div>

            <div className="mt-10 space-y-4">
                <div className="w-52 h-6 bg-[#2c2c30] rounded" />
                {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#2c2c30]" />
                        <div className="flex-1 space-y-2">
                            <div className="w-24 h-4 bg-[#2c2c30] rounded" />
                            <div className="w-full h-4 bg-[#2c2c30] rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default LoadingProfile;