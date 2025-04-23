"use client";
import Table from "@/components/Elements/Table/Table";
import { useEffect, useState } from "react";
import { Column } from "react-table";

interface JobApplication {
  title: string;
  jobProximity: string;
  location: string;
  company: string;
  priceRange: string;
  status: string;
}

const JobTable = <T extends object>({
  columns,
  data,
}: {
  columns: Column<T>[];
  data: T[];
}) => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;
  const lastPage = Math.ceil(data.length / itemsPerPage) - 1;

  useEffect(() => {
    if (page > lastPage) {
      setPage(lastPage);
    }
  }, [data.length, page, itemsPerPage]);

  const currentPageData = data.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayTotalPages =
    currentPageData.length === 0 ? totalPages - 1 : totalPages;

  return (
    <>
      <Table
        data={currentPageData}
        columns={columns}
        setPage={setPage}
        totalPages={displayTotalPages > 1 ? displayTotalPages : 0}
      />
    </>
  );
};

export default JobTable;
