import React from "react";
import Column from "components/Flexbox/Column";
import FormField from "components/FormField";
import {
  createValidation,
  vd,
  toValidationResult,
} from "@pm4ml/ts-utils/lib/validation";

const formValidation = {
  name: createValidation([vd.maxLength(10)]),
  lastname: createValidation([vd.maxLength(10)]),
  email: createValidation([vd.isEmail]),
};

export default function FormTheme() {
  const [form, setForm] = React.useState({ name: "", lastname: "", email: "" });
  const setFormValue = (field: string) => (value: string) =>
    setForm({ ...form, [field]: value });
  const validationResult = toValidationResult(form, formValidation);

  return (
    <Column align="top left">
      <FormField.Container direction="column">
        <FormField
          type="text"
          size="small"
          label="name"
          placeholder="name"
          value={form.name}
          onChange={setFormValue("name")}
          validation={validationResult.fields.name}
        />
        <FormField
          type="text"
          size="small"
          label="lastname"
          placeholder="lastname"
          value={form.lastname}
          onChange={setFormValue("lastname")}
          validation={validationResult.fields.lastname}
        />
        <FormField
          type="text"
          size="small"
          label="email"
          placeholder="email"
          value={form.email}
          onChange={setFormValue("email")}
          validation={validationResult.fields.email}
        />
      </FormField.Container>
    </Column>
  );
}
