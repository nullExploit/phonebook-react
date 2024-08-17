import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Providers from "../lib/redux/Provider";
import ErrorPage from "../components/ErrorPage";

describe("Should render error correctly", () => {
  it("Should render error", () => {
    const router = createMemoryRouter([{ path: "/", element: <ErrorPage /> }]);

    const { baseElement } = render(
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    );

    expect(baseElement).toMatchSnapshot();
    expect(document.querySelector("h1").innerHTML).toBe("Oops!");
    expect(document.querySelector("p").innerHTML).toBe(
      "Sorry, an unexpected error has occurred."
    );
  });
});
