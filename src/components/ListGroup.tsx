interface Props {
    nameObjects: any[];
}

function ListGroup({ nameObjects } : Props) {

  if (nameObjects === null || nameObjects.length === 0) {
    return <>
    <h2>No names could be found with this criteria.</h2></>;
  }
  return (
    <>
      <h1>{nameObjects.length} names were found:</h1>
      <ul className="list-group">
        {nameObjects?.map((nameObject, index) => (
          <li key={index}>{nameObject.name}</li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
