import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import Form from './form';

const spy = jest.fn();

test("test form inside popover", async () => {
    spy.mockClear();

    render(<Form submit={spy} inPopover={true} />);

    userEvent.click(screen.getByText("Add item"));

    await waitFor(() =>
        expect(screen.getByLabelText("Notification title")).toBeInTheDocument()
    );

    userEvent.type(
        screen.getByLabelText("Notification title"),
        "new notification tile"
    );
    expect(screen.getByLabelText("Notification title")).toHaveValue('new notification tile')

    userEvent.click(screen.getByText("Add"));

    await waitFor(() => () =>
        expect(screen.getByLabelText("Notification title")).toThrow()
    );

    expect(spy).toHaveBeenCalledWith({
        name: "new notification tile"
    });
});

test("test form outside popover", async () => {
    spy.mockClear();

    render(<Form submit={spy} inPopover={false}/>);

    userEvent.type(
        screen.getByLabelText("Notification title"),
        "new notification tile"
    );

    expect(screen.getByLabelText("Notification title")).toHaveValue('new notification tile')

    userEvent.click(screen.getByText("Add"));

    expect(spy).toHaveBeenCalledWith({
        name: "new notification tile"
    });
});
