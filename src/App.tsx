import { Routes, Route } from "react-router-dom";
import { Main } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route index element={<Main />} />
    </Routes>
  );
}

export { App };
