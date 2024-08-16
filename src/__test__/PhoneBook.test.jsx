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

    const el = (stat) => (
      <Providers>
        <PhoneBookButton edit={setOnEdit} editStatus={stat} />
      </Providers>
    );

    const { baseElement, rerender } = render(el(false));

    expect(baseElement).toMatchSnapshot();
    fireEvent.click(screen.getByLabelText("editbutton"));
    rerender(el(true));
    expect(screen.getByLabelText("editbutton").getAttribute("data-icon")).toBe(
      "floppy-disk"
    );
    expect(setOnEdit).toHaveReturnedTimes(1);
    expect(screen.getByLabelText("editbutton").parentElement.className).toBe(
      "button"
    );
    rerender(el(false));
    fireEvent.click(document.querySelectorAll(".buttons")[1]);
    expect(
      document.querySelectorAll(".buttons")[0].getAttribute("data-icon")
    ).toBe("check");
    expect(
      document.querySelectorAll(".buttons")[1].getAttribute("data-icon")
    ).toBe("xmark");
    fireEvent.click(document.querySelectorAll(".buttons")[1]);
  });

  it("Should render phonebook detail correctly", () => {
    const { baseElement } = render(
      <Providers>
        <PhoneBookDetail id={1} name="TESTING" phone="0911111111" />
      </Providers>
    );
    expect(baseElement).toMatchSnapshot();
    expect(screen.getByText("TESTING").tagName).toBe("P");
    expect(screen.getByText("0911111111").tagName).toBe("P");
    fireEvent.click(screen.getByLabelText("editbutton"));
    fireEvent.change(document.querySelectorAll("input")[0], {
      target: { value: "TESTING" },
    });
    fireEvent.change(document.querySelectorAll("input")[1], {
      target: { value: "08123123" },
    });
    expect(document.querySelectorAll("input")[0].value).toBe("TESTING");
    expect(document.querySelectorAll("input")[1].value).toBe("08123123");
    fireEvent.click(screen.getByLabelText("editbutton"));
    fireEvent.click(document.querySelectorAll(".buttons")[1]);
    expect(
      document.querySelectorAll(".buttons")[0].getAttribute("data-icon")
    ).toBe("check");
    expect(
      document.querySelectorAll(".buttons")[1].getAttribute("data-icon")
    ).toBe("xmark");
    fireEvent.click(document.querySelectorAll(".buttons")[1]);
  });

  it("Should render phonebook item correctly", () => {
    const { baseElement } = render(
      <Providers>
        <PhoneBookItem id={1} name="TESTING" phone="0911111111" avatar={null} />
      </Providers>
    );
    expect(baseElement).toMatchSnapshot();
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
    fireEvent.click(screen.getByLabelText("editbutton"));
    fireEvent.change(document.querySelectorAll("input[type='text']")[0], {
      target: { value: "TESTING" },
    });
    fireEvent.change(document.querySelectorAll("input[type='text']")[1], {
      target: { value: "08123123" },
    });
    expect(document.querySelectorAll("input[type='text']")[0].value).toBe(
      "TESTING"
    );
    expect(document.querySelectorAll("input[type='text']")[1].value).toBe(
      "08123123"
    );
    fireEvent.click(screen.getByLabelText("editbutton"));
    fireEvent.click(document.querySelectorAll(".buttons")[1]);
    expect(
      document.querySelectorAll(".buttons")[0].getAttribute("data-icon")
    ).toBe("check");
    expect(
      document.querySelectorAll(".buttons")[1].getAttribute("data-icon")
    ).toBe("xmark");
    fireEvent.click(document.querySelectorAll(".buttons")[1]);
  });

  it("Should render view correctly", () => {
    const { baseElement } = render(
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    );
    expect(baseElement).toMatchSnapshot();
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
