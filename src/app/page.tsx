"use client";
import { useEffect, useState } from "react";
import DataTable, {
  TableColumn,
  TableStyles,
} from "react-data-table-component";
import differenceBy from "lodash/differenceBy";
import { useRouter } from "next/navigation";
import { SiteData } from "@/types";
import { deleteDBSitesData, getDBSitesData } from "@/server-actions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { range } from "@/lib/utils";

function CompanyCell({ row }: { row: SiteData }) {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center gap-x-2">
        <img src={row.image} alt=" " className="h-6 w-6" />
        <button
          onClick={() => {
            router.push("/details");
            sessionStorage.setItem("details", JSON.stringify(row));
          }}
          className="text-[#6C2BD9] line-clamp-1"
        >
          {row.company}
        </button>
      </div>
    </>
  );
}

function SocialCell({ row }: { row: SiteData }) {
  return (
    <div className="flex gap-x-2">
      {row.socials.facebook && (
        <a href={row.socials.facebook}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_19_5339)">
              <path
                d="M15.2001 7.615C15.2001 3.47287 11.8422 0.115004 7.70007 0.115004C3.55793 0.115004 0.200073 3.47287 0.200073 7.615C0.200073 11.3584 2.9427 14.4612 6.5282 15.0239V9.78297H4.6239V7.615H6.5282V5.96266C6.5282 4.08297 7.64793 3.04469 9.36106 3.04469C10.1814 3.04469 11.0399 3.19118 11.0399 3.19118V5.03688H10.0942C9.16257 5.03688 8.87195 5.61505 8.87195 6.20875V7.615H10.952L10.6195 9.78297H8.87195V15.0239C12.4574 14.4612 15.2001 11.3584 15.2001 7.615Z"
                fill="#ECECEC"
              />
            </g>
            <defs>
              <clipPath id="clip0_19_5339">
                <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0.200073 0.115004)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>
      )}
      {row.socials.twitter && (
        <a href={row.socials.twitter}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_19_5340)">
              <path
                d="M4.91892 13.7088C10.5779 13.7088 13.674 9.01922 13.674 4.95369C13.674 4.82186 13.6711 4.68709 13.6652 4.55526C14.2675 4.11969 14.7873 3.58019 15.2001 2.96209C14.6391 3.21166 14.0436 3.37464 13.4338 3.44549C14.0759 3.0606 14.5567 2.45595 14.787 1.74363C14.1829 2.10163 13.5223 2.35416 12.8335 2.49041C12.3693 1.99726 11.7557 1.67073 11.0874 1.56131C10.4191 1.4519 9.73332 1.56569 9.13616 1.88509C8.53901 2.20449 8.0637 2.71172 7.78373 3.32835C7.50376 3.94498 7.43472 4.63666 7.58728 5.29647C6.36413 5.23509 5.16753 4.91735 4.07506 4.36384C2.98259 3.81034 2.01863 3.03343 1.24568 2.08348C0.852823 2.76081 0.732609 3.56231 0.909467 4.32509C1.08633 5.08787 1.54699 5.75468 2.19783 6.19002C1.70922 6.17451 1.23131 6.04296 0.803589 5.80623V5.84432C0.803151 6.55512 1.04888 7.24415 1.49902 7.79426C1.94915 8.34438 2.5759 8.72163 3.27273 8.8619C2.82011 8.98574 2.34506 9.00378 1.88435 8.91463C2.08098 9.52593 2.46356 10.0606 2.97868 10.444C3.4938 10.8274 4.11577 11.0404 4.75779 11.0533C3.66784 11.9095 2.32143 12.3739 0.935425 12.3717C0.689628 12.3713 0.444073 12.3562 0.200073 12.3265C1.60811 13.2299 3.24603 13.7096 4.91892 13.7088Z"
                fill="#ECECEC"
              />
            </g>
            <defs>
              <clipPath id="clip0_19_5340">
                <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0.200073 0.115004)"
                />
              </clipPath>
            </defs>
          </svg>
        </a>
      )}
      {row.socials.linkedin && (
        <a href={row.socials.linkedin}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.0897 0.115004H1.3075C0.69519 0.115004 0.200073 0.598402 0.200073 1.19606V14.031C0.200073 14.6287 0.69519 15.115 1.3075 15.115H14.0897C14.702 15.115 15.2001 14.6287 15.2001 14.0339V1.19606C15.2001 0.598402 14.702 0.115004 14.0897 0.115004ZM4.65027 12.8972H2.42371V5.73707H4.65027V12.8972ZM3.53699 4.76149C2.82214 4.76149 2.245 4.18434 2.245 3.47243C2.245 2.76051 2.82214 2.18336 3.53699 2.18336C4.2489 2.18336 4.82605 2.76051 4.82605 3.47243C4.82605 4.18141 4.2489 4.76149 3.53699 4.76149ZM12.9823 12.8972H10.7587V9.41676C10.7587 8.58766 10.744 7.51832 9.60144 7.51832C8.44421 7.51832 8.26843 8.4236 8.26843 9.35817V12.8972H6.04773V5.73707H8.18054V6.71559H8.20984C8.50574 6.15309 9.2323 5.55836 10.3134 5.55836C12.5663 5.55836 12.9823 7.04079 12.9823 8.96852V12.8972Z"
              fill="#ECECEC"
            />
          </svg>
        </a>
      )}
    </div>
  );
}

const columns: TableColumn<SiteData>[] = [
  {
    name: "COMPANY",
    selector: (row) => row.company,
    cell: (row) => <CompanyCell row={row} />,
    maxWidth: "180px",
  },
  {
    name: "SOCIAL PROFILES",
    cell: (row) => <SocialCell row={row} />,
    maxWidth: "140px",
  },
  {
    name: "DESCRIPTION",
    selector: (row) => row.description,
    maxWidth: "900px",
  },
  {
    name: "ADDRESS",
    selector: (row) => row.address,
    maxWidth: "300px",
  },
  {
    name: "PHONE NO.",
    selector: (row) => row.phone,
    cell: (row) => <div className="text-[#6C2BD9]">{row.phone}</div>,
    maxWidth: "140px",
  },
  {
    name: "EMAIL",
    selector: (row) => row.email,
    cell: (row) => <div className="text-[#6C2BD9]">{row.email}</div>,
    maxWidth: "180px",
  },
];

const customStyles: TableStyles = {
  rows: {
    style: {
      minHeight: "55px",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F9FAFB",
      minHeight: "50px",
      color: "#6B7280",
    },
  },
  cells: {
    style: {
      color: "#6B7280",
    },
  },
};

export default function Home() {
  const [selectedRows, setSelectedRows] = useState<SiteData[]>([]);
  const [toggledClearRows, setToggleClearRows] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 5;
  const totalPages = Math.ceil(totalRows / limit);

  function convertArrayOfObjectsToCSV(array: []) {
    let result: string;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  async function downloadCSV() {
    const { data: array } = await getDBSitesData(0, 0);
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array as []);
    if (csv == null) return;

    const filename = "export.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  async function getData() {
    setLoading(true);
    const { data: _data, total } = await getDBSitesData(
      (page - 1) * limit,
      limit
    );
    setData(_data as []);
    setTotalRows(total);
    setLoading(false);
  }

  function handleChange({ selectedRows }: { selectedRows: [] }) {
    setSelectedRows(selectedRows);
  }

  async function handleDelete() {
    if (window.confirm(`Are you sure you want to delete?`)) {
      await deleteDBSitesData(selectedRows.map((row) => row._id));
      setToggleClearRows(!toggledClearRows);
      setData(differenceBy(data, selectedRows, "_id"));
      setSelectedRows([]);
    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div className="m-1 rounded-sm bg-white">
      <div className="flex gap-x-10 items-center px-4 pt-7 pb-3">
        <span className="text-neutral-700">{selectedRows.length} selected</span>
        <div className="flex gap-x-4">
          <button
            onClick={handleDelete}
            className="border py-1 px-2 rounded-lg text-slate-500 text-sm"
          >
            Delete
          </button>
          <button
            onClick={downloadCSV}
            className="border py-1 px-2 rounded-lg text-slate-500 text-sm flex items-center gap-x-1"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.79167 9H2.125H7.79167Z" fill="#A2A2A2" />
              <path
                d="M7.79167 9H2.125"
                stroke="#A2A2A2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.3333 4.75H2.125"
                stroke="#A2A2A2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11.3333 13.25H2.125"
                stroke="#A2A2A2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.75 6.875V11.125"
                stroke="#A2A2A2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.875 9H10.625"
                stroke="#A2A2A2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Export as CSV
          </button>
        </div>
      </div>
      <DataTable
        columns={columns as any}
        data={data}
        selectableRows
        onSelectedRowsChange={handleChange as any}
        progressPending={loading}
        clearSelectedRows={toggledClearRows}
        customStyles={customStyles}
      />
      <div
        className="bg-white py-5 flex pl-3 gap-2 border-t items-center"
        style={{ visibility: data.length > 0 ? "initial" : "hidden" }}
      >
        <p className="text-neutral-700">
          Showing &nbsp;
          <b>
            {page}-{limit}
          </b>
          &nbsp; of <b>{totalPages}</b>
        </p>

        <div className="flex border-2 rounded-md">
          <button
            disabled={!(page > 1)}
            className="border-r-2"
            onClick={() => setPage((page) => page - 1)}
          >
            <ChevronLeft className="text-neutral-500 " />
          </button>
          {totalPages - page < 5 ? (
            <>
              {range(page + 1, totalPages).map((v) => (
                <button
                  key={v}
                  disabled={v === page}
                  className="border-r-2 px-2 text-neutral-500"
                  onClick={() => setPage(v)}
                >
                  {v}
                </button>
              ))}
            </>
          ) : (
            <>
              {range(page, page + 2).map((v) => (
                <button
                  key={v}
                  disabled={v === page}
                  className="border-r-2 px-2 text-neutral-500"
                  onClick={() => setPage(v)}
                >
                  {v}
                </button>
              ))}

              <button
                className="border-r-2 px-2 text-neutral-500"
                onClick={() => setPage(page + 3)}
              >
                ...
              </button>
              <button
                disabled={page === totalPages}
                className="border-r-2 px-2 text-neutral-500"
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
          <button
            disabled={!(totalPages > page)}
            onClick={() => setPage((page) => page + 1)}
          >
            <ChevronRight className="text-neutral-500 " />
          </button>
        </div>
      </div>
    </div>
  );
}
