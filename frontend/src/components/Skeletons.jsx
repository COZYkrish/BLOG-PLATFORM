import { motion } from 'framer-motion';

export const SkeletonLoader = () => {
    return (
        <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg"
        />
    );
};

export const BlogCardSkeleton = () => {
    return (
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-gray-700/50">
            {/* Image Skeleton */}
            <SkeletonLoader />
            <div className="h-48 mb-4" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-4">
                {/* Author */}
                <div className="flex gap-2">
                    <SkeletonLoader />
                    <div className="h-6 w-24" />
                </div>

                {/* Title */}
                <div className="space-y-2">
                    <SkeletonLoader />
                    <div className="h-6 w-3/4" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <SkeletonLoader />
                    <div className="h-4 w-full" />
                    <SkeletonLoader />
                    <div className="h-4 w-5/6" />
                </div>

                {/* Footer */}
                <div className="flex justify-between">
                    <SkeletonLoader />
                    <div className="h-4 w-12" />
                </div>
            </div>
        </div>
    );
};

export const PageSkeleton = () => {
    return (
        <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
                <BlogCardSkeleton key={i} />
            ))}
        </div>
    );
};

export const FormSkeleton = () => {
    return (
        <div className="space-y-4">
            <SkeletonLoader />
            <div className="h-12 w-full" />
            
            <SkeletonLoader />
            <div className="h-64 w-full" />
            
            <SkeletonLoader />
            <div className="h-10 w-full" />
        </div>
    );
};
