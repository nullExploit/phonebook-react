import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PhoneBookBox from "./components/PhoneBookBox";
import ErrorPage from "./components/ErrorPage";
import PhoneBookAdd from "./components/PhoneBookAdd";
import Providers from "./lib/redux/Provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PhoneBookBox />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/add",
    element: <PhoneBookAdd />,
  },
]);

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;
