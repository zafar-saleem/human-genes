export const url = (id) => `https://mygene.info/v3/gene/${id}?fields=accession&dotfield=false&size=10`;

export const mockTransactionDataColumns = () => {
  return [
    { field: "Ensembl", headerName: "Ensembl", width: 180 },
    {
      field: "Gene symbol",
      headerName: "Gene Symbol",
      width: 150,
      sortable: true,
      filter: "agSetColumnFilter",
      filterParams: {
        caseSensitive: true
      }
    },
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Biotype", headerName: "Biotype", width: 200 },
    { field: "Chromosome", headerName: "Chromosome", width: 125 }
  ];
};
