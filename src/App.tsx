import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './App.css';
import api from './api/axiosConfig';
import { useState } from 'react';
import { Box, Divider, Grid, GridItem, HStack, Show, Stack } from '@chakra-ui/react'
import Button from "./components/Button";
import InputField from './components/InputField';
import NameList from './components/NameList';
import UnisexCheckbox from './components/UnisexCheckbox';
import CountryDropdown from './components/CountryDropdown';
import GenderDropdown from './components/GenderDropdown';

function App() {

  const [nameObjects, setNameObjects] = useState<FirstName[]>([]);

  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");
  const [gender, setGender] = useState("All");
  const [isUnisex, setIsUnisex] = useState(false);
  const [countries, setCountries] = useState("");


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
      const response = await api.get<FirstName[]>(url);
      console.log(response.data);
      setNameObjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="background">
      <Grid templateAreas={{
        base: `"main"`,
        md: `"aside main aside2"`
      }}>
        <Show above="md">
          <GridItem area="aside" width="25%"></GridItem>
        </Show>
        <GridItem area="main">
          <div className="m-0 border-0 bd-example m-0 border-0">
          <h1 className="display-1">NameNest</h1>
          <h6>The perfect name for your baby waits here!</h6>
          <Stack spacing={4}>
            <InputField name="Prefix" fieldValue={startsWith} setValue={setStartsWith}></InputField>
            <InputField name="Suffix" fieldValue={endsWith} setValue={setEndsWith}></InputField>
            <InputField name="Contains" fieldValue={contains} setValue={setContains}></InputField>
          </Stack>
          <Divider colorScheme='dark'></Divider>
          <HStack>
            <Box width="30%">
              <GenderDropdown setValue={setGender}></GenderDropdown>
            </Box>
            <Box width="70%">
              <CountryDropdown setValue={setCountries}></CountryDropdown>
            </Box>
          </HStack>
          <UnisexCheckbox gender={gender} isUnisex={isUnisex} setValue={setIsUnisex}></UnisexCheckbox>
          <br></br>
          <Button onClick={() => getNames()}>Find Names</Button>
          <br></br>
          <br></br>
          <NameList nameObjects={nameObjects}/>
          <br></br>
          </div>
        </GridItem>
        <Show above="md">
          <GridItem area="aside2" width="25%"></GridItem>
        </Show>
      </Grid>
    </div>
    </>
  );
}

export default App;
