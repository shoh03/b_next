import Link from "next/link";

const NAV_ITEMS = [
    { label: "서비스 소개", href: "/" },
    { label: "분석도구", href: "/" },
    { label: "지원사업", href: "/supply" },
    { label: "게시판", href: "/post" },
    { label: "기획서 AI 분석", href: "/" },
];

export default function SiteHeader() {
    return (
        <header className="h-24 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="mx-auto flex h-full w-[1200px] items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 text-[26px] font-extrabold text-[#1f3a5f]">
                    <img src="/assets/icons/logo.svg" alt="" width={36} height={36} />
                    <span>StartFit</span>
                </Link>
                <nav className="flex gap-10 text-base font-semibold text-[#1f3a5f]">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.label} href={item.href}>
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-gradient-to-br from-[#3ddcc6] to-[#0f5f5a] text-sm font-bold text-white">
                    회
                </div>
            </div>
        </header>
    );
}
