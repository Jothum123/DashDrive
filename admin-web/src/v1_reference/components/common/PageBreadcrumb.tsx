import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
    pageTitle: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white tracking-tight">
                {pageTitle}
            </h2>
            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-primary dark:text-gray-400"
                            to="/"
                        >
                            Home
                        </Link>
                    </li>
                    <ChevronRight size={14} className="text-gray-400" />
                    <li className="text-xs font-bold uppercase tracking-widest text-gray-800 dark:text-white">
                        {pageTitle}
                    </li>
                </ol>
            </nav>
        </div>
    );
};

export default PageBreadcrumb;
