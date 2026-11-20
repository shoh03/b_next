"use client"

import type { FormEvent } from "react";
import { SupplySearchType, SUPPLY_SEARCH_TYPE_LABEL } from "@/enums/supply.enum";

interface SupplySearchBarProps {
    keyward: string;
    searchType: SupplySearchType;
    onKeywardChange: (value: string) => void;
    onSearchTypeChange: (value: SupplySearchType) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function SupplySearchBar({
    keyward,
    searchType,
    onKeywardChange,
    onSearchTypeChange,
    onSubmit,
}: SupplySearchBarProps) {
    return (
        <form onSubmit={onSubmit} className="flex h-[52px] items-stretch">
            <div className="relative flex w-[164px] items-center border border-gray-300 px-4">
                <select
                    aria-label="검색 대상"
                    value={searchType}
                    onChange={(event) => onSearchTypeChange(event.target.value as SupplySearchType)}
                    className="w-full appearance-none bg-transparent pr-4 text-[15px] outline-none"
                >
                    {Object.values(SupplySearchType).map((type) => (
                        <option key={type} value={type}>
                            {SUPPLY_SEARCH_TYPE_LABEL[type]}
                        </option>
                    ))}
                </select>
                <img
                    src="/assets/icons/chevron-down.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="pointer-events-none absolute right-4"
                />
            </div>
            <label className="ml-2 flex flex-1 items-center gap-3 border border-gray-300 px-4">
                <img src="/assets/icons/search.svg" alt="" width={20} height={20} />
                <input
                    type="text"
                    value={keyward}
                    onChange={(event) => onKeywardChange(event.target.value)}
                    placeholder="제목이나 내용으로 검색"
                    className="flex-1 text-[17px] outline-none placeholder:text-gray-400"
                />
            </label>
            <button type="submit" className="w-[70px] bg-black text-[15px] font-bold text-white">
                검색
            </button>
        </form>
    );
}
