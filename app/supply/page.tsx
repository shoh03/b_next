import SiteHeader from "@/components/common/SiteHeader";
import SiteFooter from "@/components/common/SiteFooter";
import SupplyView from "./_components/SupplyView";

export default function SupplyPage() {
    return (
        <>
            <SiteHeader />
            <main className="mx-auto w-[1200px] pt-16">
                <p className="text-sm text-gray-500">홈 › 지원사업</p>
                <h1 className="mt-4 text-[44px] font-extrabold tracking-[-0.02em]">지원사업</h1>
                <SupplyView />
            </main>
            <SiteFooter />
        </>
    );
}
