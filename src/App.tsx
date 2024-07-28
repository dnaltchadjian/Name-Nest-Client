import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import './App.css';
import api from './api/axiosConfig';
import { useEffect, useRef, useState } from 'react';
import { Box, FormLabel, Grid, GridItem, Show, Stack } from '@chakra-ui/react'
import FindButton from "./components/FindButton";
import InputField from './components/InputField';
import NameList from './components/NameList';
import UnisexCheckbox from './components/UnisexCheckbox';
import CountryDropdown from './components/CountryDropdown';
import GenderDropdown from './components/GenderDropdown';
import { NameUtil } from './util/NameUtil';
import FavouritesDrawer from './components/FavouritesDrawer';
import AboutPopup from './components/AboutPopup';

function App() {

  //name count and objects from api
  const [nameObjects, setNameObjects] = useState<FirstName[]>([]);
  const [nameCount, setNameCount] = useState(0);

  //url items
  const startsWith = useRef<string>("");
  const endsWith = useRef<string>("");
  const contains = useRef<string>("");
  const [gender, setGender] = useState("All");
  const [isUnisex, setIsUnisex] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);

  //functional stuff
  const [favoriteNames, setFavoriteNames] = useState<FirstName[]>([]);
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
        url += "&startsWith=" + startsWith.current.trim();
      }
      if (endsWith.current !== "") {
        url += "&endsWith=" + endsWith.current.trim();
      }
      if (contains.current !== "") {
        url += "&contains=" + contains.current.trim();
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
    console.log("countries: " + countries.length);
    
    setIsSearchDisabled(startsWith.current === "" && endsWith.current === "" && contains.current === "" && countries.length === 0);
  }

  useEffect(() => {
    const favouritesData = window.localStorage.getItem("FAVOURITE_NAMES");
    if (favouritesData !== null) {
      //favoriteNames(JSON.parse(favouritesData));
    }
  }, [])

    /**
   * Recreates the name array with favorites included, creates the new 
   * @param index 
   */
    const buildFavorites = (index: number) => {
      var nos: FirstName[] = [];
      nameObjects.forEach(val => nos.push(Object.assign({}, val)));
      var no = nos[index];
      no.favorite = !no.favorite;
      nos[index] = no;
      setNameObjects(nos);

      var favs: FirstName[] = [];
      nos.forEach(val => {
        if (val.favorite) {
          favs.push(Object.assign({}, val));
          console.log("found favorite: " + val.name);
          
        }
      });

      favs.sort((a, b) => {
        if (a.name.localeCompare(b.name) < 0) {
          return -1;
        } else if (a.name.localeCompare(b.name) > 0) {
          return 1;
        }
        return 0;
      });
      setFavoriteNames(favs);
    }

  // useEffect(() => {
  //   window.localStorage.setItem("FAVOURITE_NAMES", JSON.stringify(favoriteNames));
  // }, [favoriteNames])

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
                <FavouritesDrawer favorites={favoriteNames}></FavouritesDrawer>
            </GridItem>
            <GridItem colStart={2} colSpan={8}>
              <h1 className='display-5'>NameNest</h1>
            </GridItem>
            <GridItem colStart={10} alignItems="start">
              <AboutPopup></AboutPopup>
            </GridItem>
          </Grid>
          <hr className="divider-padding"></hr>
          <FormLabel display="inline-block">The perfect name for your baby waits here!</FormLabel>
          <Stack spacing={4}>
            <InputField name="Starts With" fieldValue={startsWith} isSearchDisabledFunction={isSearchDisabledFunction}></InputField>
            <InputField name="Ends With" fieldValue={endsWith} isSearchDisabledFunction={isSearchDisabledFunction}></InputField>
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
              <CountryDropdown setCountries={setCountries} isSearchDisabledFunction={isSearchDisabledFunction}></CountryDropdown>
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
            pageNumber={pageNumber} setPageNumber={setPageNumber} pageClickFunction={getNames} buildFavorites={buildFavorites}/>
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
