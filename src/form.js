import React, { useCallback } from "react";

import { Button, Popover } from "@patternfly/react-core";
import FormTemplate from "@data-driven-forms/pf4-component-mapper/form-template";
import FormRenderer from "@data-driven-forms/react-form-renderer/form-renderer";
import componentMapper from "@data-driven-forms/pf4-component-mapper/component-mapper";

const Form = ({ submit = console.log, inPopover, simple = false }) => {
    // FIXED HERE
    const Template = useCallback((props) => <FormTemplate {...props} submitLabel="Add" />, [])

    return (
    <div className="pf-u-p-2xl">
        {!simple && inPopover && <Popover
            key="ft"
            headerContent={<div>Add notification item</div>}
            bodyContent={(hide) => (
                <div>
                <FormRenderer
                    componentMapper={componentMapper}
                    onSubmit={(values) => { submit(values); hide(); }}
                    FormTemplate={Template}
                    // THIS IS BROKEN:
                    //FormTemplate={(props) => <FormTemplate {...props} submitLabel="Add" />}
                    onCancel={hide}
                    debug={console.log}
                    schema={{
                        fields: [
                            {
                                component: "text-field",
                                name: "name",
                                label: "Notification title",
                                'aria-label': "Notification title",
                                validate: [{ type: 'required' }]
                            }
                        ]
                    }}
                />
                </div>
            )}
        >
            <Button>Add item</Button>
        </Popover>}
        {simple && inPopover && <Popover
            headerContent={<div>Add notification item</div>}
            bodyContent={(hide) => (
                <form noValidate className="pf-c-form" onSubmit={(e) => { e.preventDefault(); submit({ some: 'value' }); hide(); }}>
                    <div className="pf-c-form__group">
                        <div className="pf-c-form__group-label">
                            <label className="pf-c-form__label" htmlFor="name">
                                <span className="pf-c-form__label-text">Notification title</span>
                            </label>
                        </div>
                        <div className="pf-c-form__group-control">
                            <input name="name" aria-label="Notification title" id="name" className="pf-c-form-control" type="text" aria-invalid="false" data-ouia-component-type="PF4/TextInput" data-ouia-safe="true" data-ouia-component-id="OUIA-Generated-TextInputBase-4" />
                        </div>
                    </div>
                    <div className="pf-c-form__group pf-m-action">
                        <div className="pf-c-form__group-control">
                            <div className="pf-c-form__actions">
                                <button aria-disabled="false" className="pf-c-button pf-m-primary" type="submit" data-ouia-component-type="PF4/Button" data-ouia-safe="true" data-ouia-component-id="OUIA-Generated-Button-primary-5">Add</button>
                                <button aria-disabled="false" className="pf-c-button pf-m-link" type="button" data-ouia-component-type="PF4/Button" data-ouia-safe="true" data-ouia-component-id="OUIA-Generated-Button-link-4">Cancel</button>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        >
            <Button>Add item</Button>
        </Popover>}
        {!inPopover && <FormRenderer
            componentMapper={componentMapper}
            onSubmit={(values) => { submit(values); }}
            FormTemplate={(props) => <FormTemplate {...props} submitLabel="Add" />}
            schema={{
                fields: [
                    {
                        component: "text-field",
                        name: "name",
                        label: "Notification title",
                        validate: [{ type: 'required' }]
                    }
                ]
            }}
        />}
    </div>
);}

export default Form;
