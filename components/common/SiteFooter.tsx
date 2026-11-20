import Link from "next/link";
import FooterColumn from "./FooterColumn";

const SERVICE_LINKS = ["분석도구", "지원사업", "기획서 AI 분석", "게시판"];
const DATA_SOURCES = ["소상공인시장진흥공단", "서울시 상권분석서비스", "한국부동산원"];
const NOTICES = ["화면 속 수치는 예시에요", "데이터 기준일 2026.10"];

export default function SiteFooter() {
    return (
        <footer className="bg-[#0e1a2e] px-0 pt-[72px] pb-10 text-slate-300">
            <div className="mx-auto w-[1200px]">
                <div className="flex justify-between border-b border-[#1e2b40] pb-14">
                    <div>
                        <strong className="block text-2xl font-extrabold text-white">StartFit</strong>
                        <p className="mt-4 text-[15px]">창업, 데이터로 먼저 확인하세요.</p>
                    </div>
                    <div className="flex gap-24">
                        <FooterColumn title="서비스" items={SERVICE_LINKS} />
                        <FooterColumn title="데이터 출처" items={DATA_SOURCES} />
                        <FooterColumn title="안내" items={NOTICES} />
                    </div>
                </div>
                <div className="py-14 text-[150px] font-black leading-none tracking-[-0.04em] text-slate-700">
                    Start <span className="text-[#0f5f5a]">Fit</span>
                </div>
                <div className="flex justify-between border-t border-[#1e2b40] pt-6 text-[13px]">
                    <span>© 2026 StartFit</span>
                    <Link href="#top">맨 위로 ↑</Link>
                </div>
            </div>
        </footer>
    );
}
