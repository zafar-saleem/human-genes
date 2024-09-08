"use client";

import { useRef, useState, useCallback } from "react";
import { CSVSelector } from "src/components/CSVSelector";
import { AgGridReact } from "ag-grid-react";

export const mockTransactionDataColumns = () => {
  return [
    { field: "Ensembl", headerName: "Ensembl", width: 100 },
    {
      field: "Gene symbol",
      headerName: "Gene Symbol",
      width: 200,
      sortable: true,
      filter: "agSetColumnFilter",
      filterParams: {
        caseSensitive: true
      }
    },
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Biotype", headerName: "Biotype", width: 200 },
    { field: "Chromosome", headerName: "Chromosome", width: 200 }
  ];
};

export const CSVReader = () => {
  const [data, setData] = useState([]);
  const gridRef = useRef(null);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef?.current?.api.getSelectedRows();
    (document.querySelector("#selectedRows")).innerHTML = selectedRows?.length === 1 ? selectedRows[0].Ensembl : "";
  }, []);

  console.log(data);
  return (
    <div>
      <CSVSelector onChange={(_data) => setData(_data)} />
      <span id="selectedRows"></span>
      <div
        className="ag-theme-alpine"
        style={{
          height: "90vh",
          width: "100%"
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={data}
          columnDefs={mockTransactionDataColumns()}
          pagination={true}
          rowSelection={"single"}
          onSelectionChanged={onSelectionChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};
