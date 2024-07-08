import 'bootstrap/dist/css/bootstrap.css'
import api from './api/axiosConfig';
import Button from "./components/Button";
import InputField from './components/InputField';
import { useEffect, useState } from 'react';
import ListGroup from './components/ListGroup';

function App() {


  const [names, setNames] = useState<any[]>([]);

  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");

  const getNames = async () => {
    try {
      var url = "/api/v1/namesQuery?";
      if (startsWith !== null) {
        url += "&startsWith=" + startsWith;
      }
      if (endsWith !== null) {
        url += "&endsWith=" + endsWith;
      }
      if (contains !== null) {
        url += "&contains=" + contains;
      }
      console.log(url);
      const response = await api.get(url);
      console.log(response.data);
      setNames(response.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <h1 className="display-1">Baby Names</h1>
      <br></br>
      <InputField name="Starts With:" fieldValue={startsWith} setValue={setStartsWith}></InputField>
      <InputField name="Ends With:" fieldValue={endsWith} setValue={setEndsWith}></InputField>
      <InputField name="Contains:" fieldValue={contains} setValue={setContains}></InputField>
      <br></br>
      <Button onClick={() => getNames()}>Find Names</Button>
      <br></br>
      <ListGroup names={names}/>
      <br></br>
    </div>
  );
}

export default App;
