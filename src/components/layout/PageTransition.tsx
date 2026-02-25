 "use client";

 import { ReactNode } from "react";
 import { usePathname } from "next/navigation";

 type PageTransitionProps = {
   children: ReactNode;
 };

 export default function PageTransition({ children }: PageTransitionProps) {
   const pathname = usePathname();

   return (
     <div key={pathname} className="animate-page-fade-in">
       {children}
     </div>
   );
 }

