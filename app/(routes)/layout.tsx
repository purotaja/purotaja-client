import FooterSection from "@/components/shared/footer";
import MobileNav from "@/components/shared/mobile-nav";
import Navbar from "@/components/shared/navbar";
import { RoutesLayoutProps } from "@/types";

const PublicRouteLayout = ({ children }: RoutesLayoutProps) => {
  return (
    <main className="scroll-smooth min-h-screen">
      <Navbar />
      <MobileNav />
      <div className="mt-14 pb-5">
        {children}
        <FooterSection/>
      </div>
    </main>
  );
};

export default PublicRouteLayout;
