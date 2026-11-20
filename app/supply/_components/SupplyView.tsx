"use client"

import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchSupplies } from "@/api/supply/supply.api";
import { SupplySearchType } from "@/enums/supply.enum";
import SupplySearchBar from "./SupplySearchBar";
import SupplyList from "./SupplyList";
import SupplyAlertCard from "./SupplyAlertCard";

interface SupplySearchCondition {
    keyward: string;
    searchType: SupplySearchType;
}

export default function SupplyView() {
    const [inputKeyward, setInputKeyward] = useState("");
    const [inputSearchType, setInputSearchType] = useState<SupplySearchType>(SupplySearchType.TITLE_CONTENT);
    const [condition, setCondition] = useState<SupplySearchCondition>({
        keyward: "",
        searchType: SupplySearchType.TITLE_CONTENT,
    });

    const { data, isPending, isError } = useQuery({
        queryKey: ["supply", "search", condition.keyward, condition.searchType],
        queryFn: () => searchSupplies(condition.keyward, condition.searchType),
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCondition({ keyward: inputKeyward.trim(), searchType: inputSearchType });
    };

    return (
        <div className="mt-12">
            <SupplySearchBar
                keyward={inputKeyward}
                searchType={inputSearchType}
                onKeywardChange={setInputKeyward}
                onSearchTypeChange={setInputSearchType}
                onSubmit={handleSubmit}
            />
            <div className="mt-7 border-t border-black" />
            <div className="mt-10 flex gap-[120px] pb-24">
                <SupplyAlertCard bookmarkCount={data?.filter((supply) => supply.bookmarked).length ?? 0} />
                <SupplyList supplies={data ?? []} isPending={isPending} isError={isError} />
            </div>
        </div>
    );
}
