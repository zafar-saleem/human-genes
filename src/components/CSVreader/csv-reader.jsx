"use client";

import { useState } from "react";
import { CSVSelector } from "src/components/CSVSelector";

export const CSVReader = () => {
  const [data, setData] = useState([]);
  console.log(data);
  return (
    <div>
      <CSVSelector onChange={(_data) => setData(_data)} />
    </div>
  );
};
