import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './App.css';
import api from './api/axiosConfig';
import { useEffect, useRef, useState } from 'react';
import { Box, Divider, FormLabel, Grid, GridItem, Heading, HStack, Show, Stack } from '@chakra-ui/react'
import FindButton from "./components/FindButton";
import InputField from './components/InputField';
import NameList from './components/NameList';
import UnisexCheckbox from './components/UnisexCheckbox';
import CountryDropdown from './components/CountryDropdown';
import GenderDropdown from './components/GenderDropdown';
import { NameUtil } from './util/NameUtil';
import FavouritesDrawer from './components/FavouritesDrawer';

function App() {

  //count is separate from the actual objects so pagination can be created
  const [nameObjects, setNameObjects] = useState<FirstName[]>([]);
  const [nameCount, setNameCount] = useState(0);

  //url items
  const startsWith = useRef<string>("");
  const endsWith = useRef<string>("");
  const contains = useRef<string>("");
  const [gender, setGender] = useState("All");
  const [isUnisex, setIsUnisex] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [favouriteNames, setFavouriteNames] = useState("");

  const [searchExecuted, setSearchExecuted] = useState(false);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);


  /**
   * Builds the URL for API calls, bundling all search criteria into a parameterized URL.
   * @param endPoint the API endpoint to hit for the call.
   * @returns a String containing the full URL.
   */
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
      url += NameUtil.getCountriesFormatted(countries);
    return url;
  }

  /**
   * Gets a count of the names in the database from the API baed on the search criteria.
   */
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

  /**
   * Gets the full FirstName objects from the API based on the search criteria.
   * @param funcPageNumber the page of results to display.
   */
  const getNames = async (funcPageNumber : number) => {
    try {
      var url = buildURL("namesQuery");
      url += "&pageNumber=" + (funcPageNumber - 1);
      console.log("url= " + url);
      const response = await api.get<FirstName[]>(url);
      console.log(response.data);
      setNameObjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Called when Search button is clicked. Counts names, shows first page, resets page count.
   */
  const getNameCountAndFirstNamePage = () => {
    getNameCount();
    getNames(1);
    setPageNumber(1);
    setSearchExecuted(true);
  }

  /**
   * Disables the search based on the criteria of the search fields. If all are empty, it's disabled.
   */
  const isSearchDisabledFunction = () => {
    setIsSearchDisabled(startsWith.current === "" && endsWith.current === "" && contains.current === "");
  }

  useEffect(() => {
    const favouritesData = window.localStorage.getItem("FAVOURITE_NAMES");
    if (favouritesData !== null) {
      setFavouriteNames(JSON.parse(favouritesData));
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem("FAVOURITE_NAMES", JSON.stringify(favouriteNames));
  }, [favouriteNames])

  return (
    <>
    <Box className="background">
      <Grid templateAreas={{
        base: `"main main main main main main"`,
        md: `"aside main main main main aside2"`,
        lg: `"aside aside main main aside2 aside2"`
      }}
      templateColumns='repeat(6, 1fr)'>
        <Show above="lg">
          <GridItem area="aside"></GridItem>
        </Show>
        <GridItem area="main">
          <Grid templateColumns='repeat(10, 1fr)' alignItems="baseline" padding={0}>
            <GridItem colStart={1} colSpan={1} alignItems="start">
              <FavouritesDrawer></FavouritesDrawer>
            </GridItem>
            <GridItem colStart={2} colSpan={8}>
              <h1 className='display-5'>NameNest</h1>
            </GridItem>
          </Grid>
          <hr className="divider-padding"></hr>
          <FormLabel display="inline-block">The perfect name for your baby waits here!</FormLabel>
          <Stack spacing={4}>
            <InputField name="Prefix" fieldValue={startsWith} isSearchDisabledFunction={isSearchDisabledFunction}></InputField>
            <InputField name="Suffix" fieldValue={endsWith} isSearchDisabledFunction={isSearchDisabledFunction}></InputField>
            <InputField name="Contains" fieldValue={contains} isSearchDisabledFunction={isSearchDisabledFunction}></InputField>
          </Stack>
          <hr></hr>
          <Stack>
            <Box>
              <GenderDropdown setValue={setGender}></GenderDropdown>
              <UnisexCheckbox gender={gender} isUnisex={isUnisex} setValue={setIsUnisex}></UnisexCheckbox>
            </Box>
            <hr></hr>
            <Box>
              <CountryDropdown setCountries={setCountries}></CountryDropdown>
            </Box>
          </Stack>
          <br></br>
          <FindButton onClick={() => getNameCountAndFirstNamePage()} isDisabled={isSearchDisabled}>Find Names</FindButton>
          <br></br>
          <br></br>
        </GridItem>
        <Show above="lg">
          <GridItem area="aside2"></GridItem>
        </Show>
      </Grid>
      {/* second grid for displaying the names all pretty. */}
      <Grid templateAreas={{
        base: `"main main main main main"`,
        xl: `"aside main main main aside2"`
      }}
      templateColumns='repeat(5, 1fr)'>
        <Show above="xl">
          <GridItem area="aside2"></GridItem>
        </Show>
        <GridItem area="main">
          <NameList nameCount={nameCount} nameObjects={nameObjects} searchExecuted={searchExecuted}
            pageNumber={pageNumber} setPageNumber={setPageNumber} pageClickFunction={getNames} />
          <br></br>
        </GridItem>
        <Show above="xl">
          <GridItem area="aside2"></GridItem>
        </Show>
      </Grid>
    </Box>
    </>
  );
}

export default App;
