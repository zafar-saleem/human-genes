"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { CSVSelector } from "src/components/CSVSelector";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReactECharts from "echarts-for-react";
import { Grid, Alert } from "@mantine/core";
import { url, mockTransactionDataColumns } from "../../utils/utils";

const fetchPosts = async (geneID) => {
  const response = await axios.get(url(geneID));
  return response.data;
};

export const CSVReader = () => {
  const [data, setData] = useState([]);
  const [geneID, setGeneID] = useState(0);
  const gridRef = useRef(null);
  const [chartsOptions, setChartOptions] = useState();
  const [error, setError] = useState("");

  const { data: gene, refetch } = useQuery({
    queryKey: ["geneID", geneID],
    queryFn: () => fetchPosts(geneID),
    enabled: false,
  });

  useEffect(() => {
    if (geneID !== 0) refetch();
  }, [geneID]);

  useEffect(() => {
    if (!gene) return;
    if (!Object.hasOwn(gene, "accession") || !Object.hasOwn(gene?.accession, "protein")) return setError(`No proteins list found for ${geneID}`);
    setError("");
    setChartOptions({
      label: "ASDSADASDS",
      xAxis: {
        type: 'category',
        data: gene.accession?.protein?.map(name => name.substring(0, 2)),
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: gene.accession?.protein?.map(name => name.charAt(name.length - 3)),
          type: 'bar'
        }
      ]
    });
  }, [gene]);

  console.log(error);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef?.current?.api.getSelectedRows();
    setGeneID(selectedRows[0].Ensembl);
    // (document.querySelector("#selectedRows")).innerHTML = selectedRows?.length === 1 ? selectedRows[0].Ensembl : "";
  }, []);

  console.log(geneID, gene);
  return (
    <Grid>
      <Grid.Col span={6}>
        <CSVSelector onChange={(_data) => setData(_data)} />
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
      </Grid.Col>
      <Grid.Col span={4}>
        {chartsOptions && <ReactECharts option={chartsOptions} />}
        {error && <Alert variant="light" color="red" title="Item Not Found">{error}</Alert>}
      </Grid.Col>
    </Grid>
  );
};
