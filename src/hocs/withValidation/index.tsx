import React from "react";
import Tooltip from "components/Tooltip";
import { ValidationResult } from "@pm4ml/ts-utils/lib/validation";
import ValidationCard from "./ValidationCard";

interface BaseProps {
  hasEmptyValue?: boolean;
  required?: boolean;
  invalid?: boolean;
}
export interface WithValidationProps {
  focused?: boolean;
  validation?: ValidationResult;
}

export default function withValidation<Props extends BaseProps>(
  Component: React.ComponentType<Props>
) {
  return React.forwardRef(function WithValidation(
    props: Props & WithValidationProps,
    ref
  ) {
    const isRequired = props.validation?.isRequired;
    const isValid = props.validation?.isValid;
    const required = props.required || isRequired;
    // invalid explicitely set or only when has value + validation
    const invalid =
      props.invalid || (isValid === false && props.hasEmptyValue === false);
    const component = (
      <Component
        {...(props as Props)}
        required={required}
        invalid={invalid}
        ref={ref}
      />
    );
    return (
      <Tooltip
        fixed={!!props.focused && !!props.validation}
        content={
          <ValidationCard
            empty={props.hasEmptyValue}
            messages={props.validation?.messages}
            required={required}
            invalid={invalid}
          />
        }
        position="right"
      >
        {component}
      </Tooltip>
    );
  });
}
