"use client";

import Papa from "papaparse";

/* eslint-disable-next-line react/prop-types */
export const CSVSelector = ({ onChange }) => {
  const handleFileChange = async (event) => {
    if (event.target.files) {
      try {
        const file = event.target.files[0];

        Papa.parse(file, {
          worker: true,
          header: true,
          complete({ data }) {
            onChange(data);
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return <input type="file" accept=".csv" onChange={handleFileChange} />;
};
