import { Navbar } from "@/components/navbar";

interface HomePageLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <>
      <div className="p-2">
        <Navbar />
        {children}
        <Navbar />
      </div>
    </>
  );
};

export default AuthLayout;
