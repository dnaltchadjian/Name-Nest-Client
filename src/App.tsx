import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './App.css';
import api from './api/axiosConfig';
import { useCallback, useRef, useState } from 'react';
import { Box, Divider, FormLabel, Grid, GridItem, Heading, HStack, Show, Stack } from '@chakra-ui/react'
import FindButton from "./components/FindButton";
import InputField from './components/InputField';
import NameList from './components/NameList';
import UnisexCheckbox from './components/UnisexCheckbox';
import CountryDropdown from './components/CountryDropdown';
import GenderDropdown from './components/GenderDropdown';

function App() {

  //count is separate from the actual objects so pagination can be created
  const [nameObjects, setNameObjects] = useState<FirstName[]>([]);
  const [nameCount, setNameCount] = useState(0);

  const startsWith = useRef<string>("");
  const endsWith = useRef<string>("");
  const contains = useRef<string>("");
  const [gender, setGender] = useState("All");
  const [isUnisex, setIsUnisex] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);

  const buildURL = (endPoint : string) => {
    var url = "/api/v1/" + endPoint + "?";
      if (startsWith.current !== "") {
        url += "&startsWith=" + startsWith.current;
      }
      if (endsWith.current !== "") {
        url += "&endsWith=" + endsWith.current;
      }
      if (contains.current !== "") {
        url += "&contains=" + contains.current;
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
      var url = buildURL("namesCount");
      console.log("url= " + url);
      const response = await api.get(url);
      setNameCount(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getNames = async (pageNumber : number) => {
    try {
      var url = buildURL("namesQuery");
      url += "&pageNumber=" + (pageNumber - 1);
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

  const isSearchDisabledFunction = () => {
    setIsSearchDisabled(startsWith.current === "" && endsWith.current === "" && contains.current === "");
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
          <FormLabel display="inline-block">The perfect name for your baby waits here!</FormLabel>
          <Stack spacing={4}>
            <InputField name="Prefix" fieldValue={startsWith} isSearchDisabledFunction={isSearchDisabledFunction}></InputField>
            <InputField name="Suffix" fieldValue={endsWith} isSearchDisabledFunction={isSearchDisabledFunction}></InputField>
            <InputField name="Contains" fieldValue={contains} isSearchDisabledFunction={isSearchDisabledFunction}></InputField>
          </Stack>
          <Divider colorScheme="dark"></Divider>
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
          <FindButton onClick={() => getNameCountAndFirstNamePage()} isDisabled={isSearchDisabled}>Find Names</FindButton>
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
