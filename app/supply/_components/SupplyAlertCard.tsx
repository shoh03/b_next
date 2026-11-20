interface SupplyAlertCardProps {
    bookmarkCount: number;
}

export default function SupplyAlertCard({ bookmarkCount }: SupplyAlertCardProps) {
    return (
        <aside className="w-[282px] shrink-0">
            <div className="bg-[#e8f8f5] px-6 py-7">
                <h3 className="text-[19px] font-bold">마감 알림</h3>
                <p className="mt-3 leading-relaxed">
                    북마크한 공고의 마감 3일 전에
                    <br />
                    이메일로 알려드려요.
                </p>
                <button type="button" className="mt-5 h-11 w-full bg-black text-[15px] font-bold text-white">
                    알림 받기
                </button>
            </div>
            <div className="mt-11">
                <h3 className="text-[19px] font-bold">
                    내 북마크 <span className="ml-1 text-[#0f7a66]">{bookmarkCount}</span>
                </h3>
                <p className="mt-4 leading-[1.7] text-gray-500">북마크한 공고는 마이페이지 · 관심 지원사업에서도 볼 수 있어요.</p>
                <a href="/my-page" className="mt-4 inline-block font-semibold text-[#0f7a66] underline">
                    마이페이지에서 보기 →
                </a>
            </div>
        </aside>
    );
}
