import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react';

export default ({ input, label }) => (
    <Form.Field>
      <Checkbox
        label={label}
        checked={input.value ? true : false}
        onChange={(e, { checked }) => {
          if(typeof e.altKey !== "undefined")
            input.onChange(checked)}
        }
      />
    </Form.Field>
);
