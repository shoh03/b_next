import AuthHydration from "@/components/auth/AuthHydration";

export default function Home() {
    return (
    // React.Fragment: DOM 트리를 하나로 만들기 위한 태그 
        <>
            <AuthHydration />
            <p>Hello, World!😎</p>
        </>
    );
}
