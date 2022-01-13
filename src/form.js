import React from "react";

import { Button, Popover } from "@patternfly/react-core";
import FormTemplate from "@data-driven-forms/pf4-component-mapper/form-template";
import FormRenderer from "@data-driven-forms/react-form-renderer/form-renderer";
import componentMapper from "@data-driven-forms/pf4-component-mapper/component-mapper";

const Form = ({ submit = console.log }) => (
    <div className="pf-u-p-2xl">
        <Popover
            headerContent={<div>Add notification item</div>}
            bodyContent={(hide) => (
                <FormRenderer
                    componentMapper={componentMapper}
                    onSubmit={(values) => { submit(values); hide(); }}
                    FormTemplate={(props) => <FormTemplate {...props} submitLabel="Add" />}
                    onCancel={hide}
                    schema={{
                        fields: [
                            {
                                component: "text-field",
                                name: "name",
                                label: "Notification title"
                            }
                        ]
                    }}
                />
            )}
        >
            <Button>Add item</Button>
        </Popover>
    </div>
);

export default Form;
