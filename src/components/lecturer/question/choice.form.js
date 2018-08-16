import React from 'react';
import './choice.form.css';
import { Input } from 'reactstrap';
import { CHOICE_LETTERS } from 'statics';

export default function(formProps) {
  const {
    values,
    handleChange,
    handleBlur,
    touched,
    errors
  } = formProps;

  return (
    <div>
      {
        CHOICE_LETTERS.map((choiceLetter, index) => {
          return (
            <div key={choiceLetter}>
                <div className="choice-input-wrapper mt-2" >
                  <span>{ choiceLetter }.</span>
                  <Input
                    type={"text"}
                    name={`[${index}]`}
                    invalid={touched[index] && !!errors[index]}
                    value={values[index]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    autoComplete="false"
                  />
                </div>
                <div className="validate-error text-danger">{ touched[index] ? errors[index]: "" }</div>
            </div>
          );
        })
      }
    </div>
  )
}

export function validate(values) {
  const errors = []
  CHOICE_LETTERS.forEach((choiceLetter, index) => {
    if (!values[index] || values[index] === "") {
      errors[index] = `Choice ${choiceLetter} is required`;
    }
  })
  return errors;
}