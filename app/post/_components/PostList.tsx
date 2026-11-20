"use client"

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/api/post/post.api";
import Loading from "@/components/common/Loading";
import ErrorComponent from "@/components/common/ErrorComponent";

export default function PostList() {
    const { data, isPending, isError } = useQuery({
        queryKey: ["post", "list"],
        queryFn: getPosts,
    });

    if (isPending) return <Loading />;
    if (isError) return <ErrorComponent />;

    const posts = data ?? [];

    return (
        <ul className="divide-y divide-gray-200 border-y border-gray-200">
            {posts.map((post) => (
                <li key={post.id} className="px-4 py-3 text-sm text-gray-800">
                    {post.title}
                </li>
            ))}
        </ul>
    );
}
