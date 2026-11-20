import PostList from "./_components/PostList";

export default function PostPage() {
    return (
        <main className="mx-auto max-w-2xl p-4">
            <h1 className="mb-4 text-xl font-bold">게시판</h1>
            <PostList />
        </main>
    );
}
