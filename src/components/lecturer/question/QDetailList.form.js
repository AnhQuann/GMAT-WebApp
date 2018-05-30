import React from 'react';
import { Button } from 'reactstrap'; 
import QDetail, { validate as validateQDetail } from './QDetail.form';
import { nestFmkProps, nestFmkArrayValidate, nestFmkValidate } from '../../nestedFormik';

import { DEFAULT_QUESTION_DETAIL_VALUE } from '../../constants';

export default function(formProps) {
  const {
    values,
    custom,
    setFieldValue
  } = formProps;

  const canAddQuestionDetail = !!custom && !!custom.canAddQuestionDetail;

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
      {
        canAddQuestionDetail &&
        <Button
          color="secondary"
          size="sm"
          onClick={() => {
            setFieldValue(`[${values.length}]`, DEFAULT_QUESTION_DETAIL_VALUE);
          }}
        >
          Add question detail
        </Button>
      }
    </div>
  );
}

export function validate(values) {
  return nestFmkArrayValidate(validateQDetail)(values);
}
