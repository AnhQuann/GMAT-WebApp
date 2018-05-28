import React from 'react';
import QDetail, { validate as validateQDetail } from './QDetail.form';
import { nestFmkProps, nestFmkArrayValidate, nestFmkValidate } from '../../nestedFormik';

export default function(formProps) {
  const {
    values,
    custom
  } = formProps;

  return (
    <div>
      {
        values.map((_, index) => {
          return <QDetail
                    key={index}
                    custom={custom}
                    {...nestFmkProps(formProps, `[${index}]`)}
                 />
        })
      }
    </div>
  );
}

export function validate(values) {
  return nestFmkArrayValidate(validateQDetail)(values);
}
