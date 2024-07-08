import { useState } from "react";
import api from "./../api/axiosConfig";

interface Props {
    names: any[];
}

function ListGroup(props: Props) {

  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {props.names?.map((name) => (
          <li key={name.name}>{JSON.stringify(name)}</li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
