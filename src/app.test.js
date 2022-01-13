import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import Form from './form';

const spy = jest.fn();

test("test form inside popover", async () => {
    render(<Form submit={spy} />);

    userEvent.click(screen.getByText("Add item"));

    await waitFor(() =>
        expect(screen.getByLabelText("Notification title")).toBeInTheDocument()
    );

    userEvent.type(
        screen.getByLabelText("Notification title"),
        "new notification tile"
    );
    userEvent.click(screen.getByText("Add"));

    await waitFor(() => () =>
        expect(screen.getByLabelText("Notification title")).toThrow()
    );

    expect(spy).toHaveBeenCalled();
});
