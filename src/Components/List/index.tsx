import React, { useEffect, useState } from "react";
import { Table, Row } from "react-bootstrap";
import uuid from "react-uuid";
import data from "../../utils/res.json";
import { filterList } from "../../utils/filterList";
import { IFILTERLIST, IRES } from "../../utils/IList";

const List: React.FC = () => {
  // All declarations
  const [checkedState, setCheckedState] = useState<IFILTERLIST[]>(filterList);
  const [res, setRes] = useState<IRES[]>(data.data);
  const header: string[] = ["SI No", "Name", "Roles"];

  // All functions
  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map(
      (item: IFILTERLIST, index: number, checkedState: IFILTERLIST[]) => {
        if (index === position && position != 0) {
          item.isActive = !item.isActive;
          checkedState[0].isActive = false;
        } else if (index === position && position == 0) {
          item.isActive = !item.isActive;
          for (let index = 1; index < checkedState.length; index++) {
            checkedState[index].isActive = true;
          }
        } else {
          return item;
        }
        return item;
      }
    );
    setCheckedState(updatedCheckedState);
    const tempArr = checkedState
      .filter((data: IFILTERLIST) => data.isActive && data.name)
      .map((data) => data.name);

    const filteredArr = data.data.filter((obj: IRES) => {
      if (Array.isArray(obj.role)) {
        let temp = obj.role.map((role: string) => tempArr.includes(role));
        return temp.includes(true);
      } else {
        return tempArr.includes(obj.role);
      }
    });
    setRes(filteredArr);
  };

  useEffect(() => {}, [checkedState, res]);
  return (
    <>
      <h1>Manage Projet</h1>
      <div className="d-flex flex-row ">
        <span>Filter:</span>
        <ul className="list-group flex-row ">
          {checkedState.map((element: IFILTERLIST, index: number) => {
            return (
              <li className="list-group-item" key={uuid()}>
                <input
                  type="checkbox"
                  checked={element.isActive}
                  onChange={() => handleOnChange(index)}
                />
                <label>{element.name}</label>
              </li>
            );
          })}
        </ul>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr key={uuid()}>
            {header.map((data) => (
              <th>{data}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {res?.map((element: any, index: any) => (
            <tr key={uuid()}>
              <td>{index + 1}</td>
              <td>{element.name}</td>
              <td>
                {element?.role?.map((e: any) => (
                  <Row>{e}</Row>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default List;
