import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import CustomersTable from '@/app/ui/customers/table';
import { lusitana } from '@/app/ui/fonts';
import { fetchCustomerPages } from '@/app/lib/data';
import { Suspense } from 'react';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';

import { Metadata } from 'next';
export const metadata: Metadata = { title: { absolute: 'Customers | Acme Dashboard' } };

export default async function Page(props: { searchParams?: Promise<{ query?: string; page?: string; }>; }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchCustomerPages(query);
    return (
        <div className="w-full">
            <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>Customers</h1>
            <Search placeholder="Search customers..." />
            <Suspense key={query + currentPage} fallback={<CustomersTableSkeleton />}>
                <CustomersTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
};
