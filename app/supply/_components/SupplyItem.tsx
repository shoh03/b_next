"use client"

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { bookmarkSupply } from "@/api/supply/supply.api";
import { SupplyDTO } from "@/types/supply/supply.type";

interface SupplyItemProps {
    supply: SupplyDTO;
}

export default function SupplyItem({ supply }: SupplyItemProps) {
    const [bookmarked, setBookmarked] = useState(supply.bookmarked);

    const bookmarkMutation = useMutation({
        mutationFn: () => bookmarkSupply(supply.id),
        onError: () => setBookmarked(supply.bookmarked),
    });

    const handleBookmark = () => {
        // 낙관적 업데이트: 즉시 토글 후 요청 실패 시 원래 값으로 되돌린다
        const next = !bookmarked;
        setBookmarked(next);
        bookmarkMutation.mutate();
    };

    const isUrgent = supply.dDay <= 3;

    return (
        <article className="flex gap-6 border-b border-gray-200 py-7">
            <div className={`w-14 shrink-0 text-3xl font-extrabold leading-[1.2] ${isUrgent ? "text-[#e5484d]" : ""}`}>
                D-{supply.dDay}
            </div>
            <div className="flex-1 pt-0.5">
                <span className="inline-block bg-[#e6f7f3] px-2.5 py-0.5 text-[13px] font-bold text-[#0f7a66]">
                    {supply.category}
                </span>
                <h3 className="mt-2.5 text-xl font-bold leading-[1.45]">{supply.title}</h3>
                <p className="mt-2.5 text-[15px] text-gray-500">
                    {supply.organization} · 접수 {supply.receptionStart} – {supply.receptionEnd}
                </p>
            </div>
            <div className="flex items-center gap-2 pt-3">
                <button
                    type="button"
                    onClick={handleBookmark}
                    aria-label={bookmarked ? "북마크 해제" : "북마크"}
                    aria-pressed={bookmarked}
                    className={`flex h-11 w-11 items-center justify-center border ${bookmarked ? "border-[#0f7a66]" : "border-gray-300"}`}
                >
                    <img
                        src={bookmarked ? "/assets/icons/star-filled.svg" : "/assets/icons/star.svg"}
                        alt=""
                        width={20}
                        height={20}
                    />
                </button>
                <a
                    href={supply.detailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center gap-2 whitespace-nowrap border-[1.5px] border-black px-[18px] font-bold"
                >
                    공고 보기
                    <img src="/assets/icons/arrow-up-right.svg" alt="" width={14} height={14} />
                </a>
            </div>
        </article>
    );
}
