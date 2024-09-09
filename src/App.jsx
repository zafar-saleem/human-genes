import { CSVReader } from "src/components/CSVreader";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import '@mantine/core/styles.css';
import { Container } from "@mantine/core";

import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({});

const queryClient = new QueryClient();

function App() {
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <Container size="xlg" {...demoProps}>
            <CSVReader />
          </Container>
        </MantineProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
