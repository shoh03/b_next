import { ApiResponseDTO } from "@/types/common/common.type";
import { SupplyDTO } from "@/types/supply/supply.type";
import { SupplySearchType } from "@/enums/supply.enum";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// 검색: GET /search?keyward=...&searchType=...
export const searchSupplies = async (
    keyward: string,
    searchType: SupplySearchType,
): Promise<SupplyDTO[]> => {
    const params = new URLSearchParams({ keyward, searchType });
    const response = await fetch(`${BACKEND_URL}/search?${params.toString()}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("searchSupplies fetching failed");
    }
    const body: ApiResponseDTO<SupplyDTO[]> = await response.json();
    return body.data ?? [];
};

// 북마크: GET /supply/{id}?supplyId=...
export const bookmarkSupply = async (supplyId: number): Promise<ApiResponseDTO<unknown>> => {
    const params = new URLSearchParams({ supplyId: String(supplyId) });
    const response = await fetch(`${BACKEND_URL}/supply/${supplyId}?${params.toString()}`, {
        credentials: "include",
    });
    if (!response.ok) {
        throw new Error("bookmarkSupply request failed");
    }
    return response.json();
};
