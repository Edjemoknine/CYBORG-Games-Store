import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GamesProvider } from "./utils/Context";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <GamesProvider>
      <App />
    </GamesProvider>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
