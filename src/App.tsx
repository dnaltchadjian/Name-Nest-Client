import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './App.css';
import api from './api/axiosConfig';
import { useState } from 'react';
import { Box, Divider, Grid, GridItem, Heading, HStack, Show, Stack } from '@chakra-ui/react'
import Button from "./components/Button";
import InputField from './components/InputField';
import NameList from './components/NameList';
import UnisexCheckbox from './components/UnisexCheckbox';
import CountryDropdown from './components/CountryDropdown';
import GenderDropdown from './components/GenderDropdown';

function App() {

  //count is separate from the actual objects so pagination can be created
  const [nameObjects, setNameObjects] = useState<FirstName[]>([]);
  const [nameCount, setNameCount] = useState(0);

  const [startsWith, setStartsWith] = useState("");
  const [endsWith, setEndsWith] = useState("");
  const [contains, setContains] = useState("");
  const [gender, setGender] = useState("All");
  const [isUnisex, setIsUnisex] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);


  const buildURL = () => {
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
    return url;
  }

  const getNameCount = async () => {
    try {
      var url = buildURL();
      console.log("url= " + url);
      const response = await api.get<FirstName[]>(url);
      console.log(response.data.length);
      setNameCount(response.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const getNames = async (pageNumber : number) => {
    try {
      var url = buildURL();
      url += "&pageNumber=" + pageNumber;
      console.log("url= " + url);
      const response = await api.get<FirstName[]>(url);
      console.log(response.data);
      setNameObjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getNameCountAndFirstNamePage = () => {
    getNameCount();
    getNames(1);
  }

  return (
    <>
    <Box className="background">
      <Grid templateAreas={{
        base: `"main"`,
        lg: `"aside main main main aside2"`
      }}
      templateColumns='repeat(5, 1fr)'>
        <Show above="lg">
          <GridItem area="aside"></GridItem>
        </Show>
        <GridItem area="main">
          <Heading>NameNest</Heading>
          <Heading size="sm">The perfect name for your baby waits here!</Heading>
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
              <CountryDropdown setCountries={setCountries}></CountryDropdown>
            </Box>
          </HStack>
          <UnisexCheckbox gender={gender} isUnisex={isUnisex} setValue={setIsUnisex}></UnisexCheckbox>
          <br></br>
          <Button onClick={() => getNameCountAndFirstNamePage()}>Find Names</Button>
          <br></br>
          <br></br>
          <NameList nameCount={nameCount} nameObjects={nameObjects} pageNumberFunction={getNames}/>
          <br></br>
        </GridItem>
        <Show above="lg">
          <GridItem area="aside2"></GridItem>
        </Show>
      </Grid>
    </Box>
    </>
  );
}

export default App;
