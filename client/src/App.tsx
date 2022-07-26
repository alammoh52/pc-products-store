import { Routes, Route } from "react-router-dom";
import { ProductList } from "./pages/ProductList";
import { ProductDetails } from "./pages/ProductDetails";
import { PageLayout } from "./components/PageLayout";

function App() {
  return (
    <div>
      <PageLayout>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/:sku" element={<ProductDetails />} />
      </Routes>
      </PageLayout>
    </div>
  );
}

export default App;
