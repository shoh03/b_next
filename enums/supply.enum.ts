export enum SupplySearchType {
    TITLE = "TITLE",
    CONTENT = "CONTENT",
    TITLE_CONTENT = "TITLE_CONTENT",
}

export const SUPPLY_SEARCH_TYPE_LABEL: Record<SupplySearchType, string> = {
    [SupplySearchType.TITLE]: "제목",
    [SupplySearchType.CONTENT]: "내용",
    [SupplySearchType.TITLE_CONTENT]: "제목 + 내용",
};
