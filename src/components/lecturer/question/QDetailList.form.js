import React from 'react';
import { Button } from 'reactstrap'; 
import QDetail, { validate as validateQDetail } from './QDetail.form';
import { nestFmkProps, nestFmkArrayValidate, nestFmkValidate } from 'nestFmk';

import { DEFAULT_QUESTION_DETAIL_VALUE } from 'statics';

export default function(formProps) {
  const {
    values,
    custom,
    setFieldValue
  } = formProps;

  const canAddQuestionDetail = !!custom && !!custom.canAddQuestionDetail;
  const shouldShowNo = values.length > 1;

  return (
    <div className="">
      {
        values.map((_, index) => {
          return <div key={index} className="q-group mb-3">
            {shouldShowNo &&
              <h4>#{index + 1}</h4>
            }
            <QDetail
              custom={custom}
              {...nestFmkProps(formProps, `[${index}]`)}
            />
          </div>
        })
      }
      {
        canAddQuestionDetail &&
        <Button
          className="mt-2"
          color="secondary"
          size="sm"
          onClick={() => {
            setFieldValue(`[${values.length}]`, DEFAULT_QUESTION_DETAIL_VALUE);
          }}
        >
          Add more question detail
        </Button>
      }
    </div>
  );
}

export function validate(values) {
  return nestFmkArrayValidate(validateQDetail)(values);
}
