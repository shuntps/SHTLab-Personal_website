import { Navbar } from "./_components/navbar";

interface ProtectedLayoutProps {
   children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
   return (
      <div className="h-full w-full flex flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-400 to-gray-800">
         <Navbar />
         {children}
      </div>
   );
};

export default ProtectedLayout;
