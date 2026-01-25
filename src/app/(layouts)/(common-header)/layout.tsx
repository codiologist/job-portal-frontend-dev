import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function WhiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header variant="white" />
            <main className="pt-20 lg:pt-0">{children}</main>
            <Footer />
        </>
    );
}
