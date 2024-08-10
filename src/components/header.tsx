import { Briefcase, FileText } from "lucide-react";

import { NavLink } from "./nav-link";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img src="https://i0.wp.com/osbrasil.org.br/wp-content/uploads/2021/01/01osbicon.png?w=278&ssl=1" alt="Logo" className="h-6" />

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/proposicao">
            <FileText className="h-4 w-4" />
            Proposições
          </NavLink>
          <NavLink to="/projeto">
            <Briefcase className="h-4 w-4" />
            Projetos
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
