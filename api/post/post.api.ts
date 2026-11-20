import { PostDTO } from "@/types/post/post.type";

export const getPosts = async (): Promise<PostDTO[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    if(!response.ok){
        throw new Error("getPosts fetching failed")
    }
    const posts: PostDTO[] = await response.json()
    return posts
}
