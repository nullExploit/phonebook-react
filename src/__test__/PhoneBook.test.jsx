import { fireEvent, render, screen } from "@testing-library/react";
import Providers from "../lib/redux/Provider";
import { RouterProvider } from "react-router-dom";
import { router } from "../App";
import PhoneBookButton from "../components/PhoneBookButton";
import PhoneBookItem from "../components/PhoneBookItem";
import PhoneBookDetail from "../components/PhoneBookDetail";

describe("Should render all phonebook correctly", () => {
  it("Should render phonebook button correctly", () => {
    const setOnEdit = jest.fn();

    const tree = render(
      <Providers>
        <PhoneBookButton edit={setOnEdit} editStatus={false} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
    fireEvent.click(screen.getByLabelText("editbutton"));
    expect(setOnEdit).toHaveReturnedTimes(1);
    expect(screen.getByLabelText("editbutton").parentElement.className).toBe(
      "button"
    );
  });

  it("Should render phonebook detail correctly", () => {
    const tree = render(
      <Providers>
        <PhoneBookDetail id={1} name="TESTING" phone="0911111111" />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
    expect(screen.getByText("TESTING").tagName).toBe("P");
    expect(screen.getByText("0911111111").tagName).toBe("P");
  });

  it("Should render phonebook item correctly", () => {
    const tree = render(
      <Providers>
        <PhoneBookItem id={1} name="TESTING" phone="0911111111" avatar={null} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
    expect(screen.getByText("TESTING").tagName).toBe("P");
    expect(screen.getByText("0911111111").tagName).toBe("P");
    expect(
      screen
        .getByText("TESTING")
        .parentElement.parentElement.querySelector(".img").src
    ).toBe("");
    expect(
      screen
        .getByText("TESTING")
        .parentElement.parentElement.querySelector("form").enctype
    ).toBe("multipart/form-data");
    expect(
      screen
        .getByText("TESTING")
        .parentElement.parentElement.querySelector("form").id
    ).toBe("formUpload1");
    expect(
      screen
        .getByText("TESTING")
        .parentElement.parentElement.querySelector("input").type
    ).toBe("file");
    expect(
      screen
        .getByText("TESTING")
        .parentElement.parentElement.querySelector("input").id
    ).toBe("fileUpload1");
    expect(
      screen
        .getByText("TESTING")
        .parentElement.parentElement.querySelector("input").accept
    ).toBe("image/*");
    expect(
      screen
        .getByText("TESTING")
        .parentElement.parentElement.querySelector("button").type
    ).toBe("submit");
    expect(
      screen
        .getByText("TESTING")
        .parentElement.parentElement.querySelector("button").id
    ).toBe("submit1");
  });

  it("Should render view correctly", () => {
    const tree = render(
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    );
    expect(tree).toMatchSnapshot();
    fireEvent.change(document.querySelector(".search-bar"), {
      target: { value: "TEST" },
    });
    expect(screen.getByDisplayValue("TEST").value).toBe("TEST");
    fireEvent.change(document.querySelector(".search-bar"), {
      target: { value: "TES" },
    });
    expect(screen.getByDisplayValue("TES").value).toBe("TES");
  });
});
