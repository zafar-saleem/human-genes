"use client";

import Papa from "papaparse";
import { FileInput } from "@mantine/core";

/* eslint-disable-next-line react/prop-types */
export const CSVSelector = ({ onChange }) => {
  const handleFileChange = async (event) => {
    console.log(event);
    if (event) {
      try {
        const file = event;

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

  return <FileInput
    label="Please choose csv file"
    description="Only csv files are accepted"
    placeholder="Please choose file"
    accept=".csv"
    onChange={handleFileChange}
  />;
};
