import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import api from './api/axiosConfig';
import Button from "./components/Button";
import InputField from './components/InputField';
import { useState } from 'react';
import ListGroup from './components/ListGroup';
import GenderDropdown from './components/GenderDropdown';
import UnisexCheckbox from './components/UnisexCheckbox';
import CountryDropdown from './components/CountryDropdown';

function App() {


  const [nameObjects, setNameObjects] = useState<any[]>([]);

  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");
  const [gender, setGender] = useState("All");
  const [isUnisex, setIsUnisex] = useState(false);

  const getNames = async () => {
    try {
      var url = "/api/v1/namesQuery?";
      if (startsWith !== "") {
        url += "&startsWith=" + startsWith;
      }
      if (endsWith !== "") {
        url += "&endsWith=" + endsWith;
      }
      if (contains !== "") {
        url += "&contains=" + contains;
      }
      if (gender !== "All") {
        if (gender === "Male") {
          url += "&gender=M";
        } else {
          url += "&gender=F";
        }
        if (isUnisex) {
          url += "&isUnisex=true";
        }
      }
      console.log("url= " + url);
      const response = await api.get(url);
      console.log(response.data);
      setNameObjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
    <div className="background">
      <div className="m-0 border-0 bd-example m-0 border-0">
      <h1 className="display-1">NameNest</h1>
      <InputField name="Starts With" fieldValue={startsWith} setValue={setStartsWith}></InputField><br></br>
      <InputField name="Ends With" fieldValue={endsWith} setValue={setEndsWith}></InputField><br></br>
      <InputField name="Contains" fieldValue={contains} setValue={setContains}></InputField><br></br>
      <GenderDropdown gender={gender} setValue={setGender}></GenderDropdown>
      <UnisexCheckbox gender={gender} isUnisex={isUnisex} setValue={setIsUnisex}></UnisexCheckbox>
      <br></br>
      <CountryDropdown></CountryDropdown>
      <br></br>
      <Button onClick={() => getNames()}>Find Names</Button>
      <br></br>
      <br></br>
      <ListGroup nameObjects={nameObjects}/>
      <br></br>
      </div>
    </div>
    </>
  );
}

export default App;
