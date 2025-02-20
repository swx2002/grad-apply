import Link from 'next/link';
import Sidenav from '@/app/ui/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <Sidenav />
            </div>
            <div className="flex-grow p-7 md:overflow-y-auto md:p-7">
                {children}
            </div>
        </div>
    );
}