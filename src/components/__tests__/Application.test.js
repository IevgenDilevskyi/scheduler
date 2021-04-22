import React from "react";
import axios from "axios";
import {waitForElement, getByText, queryByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByAltText} from '@testing-library/react';

import { render, cleanup, fireEvent } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    // console.log(prettyDOM(day));
   
    // debug();

    // console.log(prettyDOM(appointment));


  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(container, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    console.log(prettyDOM(appointment))
    // debug(appointment);
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. Change the name of the student.
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Cohen Archie" }
    });
    // 5. Click the "Sylvia Palmer" interviewer button.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    // 6. Click the "Save" button.
    fireEvent.click(getByText(appointment, "Save"));
    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // 8. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByText(container, "Cohen Archie"));
    // 9. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // console.log(prettyDOM(appointment))
    // debug(appointment);
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    // expect(getByText(appointment, /could not save an appointment/i)).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, /could not save an appointment/i));
    // const day = getAllByTestId(container, "day").find(day =>
    //   queryByText(day, "Monday")
    // );
    // expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    // console.log(prettyDOM(appointment))
    // console.log(prettyDOM(day));
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();
    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(container, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByText(appointment, /could not delete an appointment/i));
    // const day = getAllByTestId(container, "day").find(day =>
    expect(getByText(appointment, /could not delete an appointment/i)).toBeInTheDocument();
    //   queryByText(day, "Monday")
    // );
    console.log(prettyDOM(appointment))
    // console.log(prettyDOM(day));
  });
});