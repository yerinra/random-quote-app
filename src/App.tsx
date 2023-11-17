import Quote from "./components/Quote/Quote";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Quote />
    </QueryClientProvider>
  );
};

export default App;
