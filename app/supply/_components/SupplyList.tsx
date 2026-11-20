"use client"

import { SupplyDTO } from "@/types/supply/supply.type";
import Loading from "@/components/common/Loading";
import ErrorComponent from "@/components/common/ErrorComponent";
import SupplyItem from "./SupplyItem";

interface SupplyListProps {
    supplies: SupplyDTO[];
    isPending: boolean;
    isError: boolean;
}

export default function SupplyList({ supplies, isPending, isError }: SupplyListProps) {
    if (isPending) return <Loading />;
    if (isError) return <ErrorComponent />;

    return (
        <section className="flex-1">
            <div className="flex items-baseline justify-between border-b border-black pb-5">
                <h2 className="text-[22px] font-bold">공고 {supplies.length}건</h2>
                <span className="text-sm text-gray-500">2026.11.11 14:00 조회</span>
            </div>
            {supplies.map((supply) => (
                <SupplyItem key={supply.id} supply={supply} />
            ))}
            <p className="mt-5 text-sm text-gray-400">
                공고 보기를 누르면 해당 지원사업 공고 사이트로 이동해요. 공고 내용은 StartFit에 저장하지 않아요.
            </p>
        </section>
    );
}
