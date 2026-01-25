import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function TransparentHeaderLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header variant="transparent" />
            {/* compensate for fixed header height */}
            <main className="pt-20 lg:pt-0">{children}</main>
            <Footer />
        </>
    );
}
