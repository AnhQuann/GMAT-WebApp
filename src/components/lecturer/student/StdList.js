import React from 'react';
import { Table } from 'reactstrap';

import './StdList.css';
 
export default function(props) {
  const students = props.students;
  const onStudentToggle = props.onStudentToggle;
  return (<Table>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {
        students.map((student, index) => {
          return (
            <tr key={index}
              className={student.selected ? "student selected": "student"}
              onClick={() => onStudentToggle(student)}
            >
              <td>{index + 1}</td>
              <td>{student.info.lastName} {student.info.firstName}</td>
              <td>{student.info.email}</td>
            </tr>
          );
        })
      }
    </tbody>
  </Table>);
}