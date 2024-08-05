import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import api from './api/axiosConfig';
import { useEffect, useRef, useState } from 'react';
import { Box, FormLabel, Grid, GridItem, Heading, Show, Stack } from '@chakra-ui/react'
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

  //functional variables for UI control
  const [favoriteNames, setFavoriteNames] = useState<FirstName[]>([]);
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [isSearchDisabled, setIsSearchDisabled] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);


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
      url += "&pageSize=" + pageSize;
      console.log("url= " + url);
      const response = await api.get<FirstName[]>(url);
      console.log(response.data);
      setNameObjects(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * Gets the full FirstName objects from the API based on the search criteria.
   * @param funcPageSize the page size of results to display.
   */
  const getNamesPageSize = async (funcPageSize : number) => {
    try {
      var url = buildURL("namesQuery");
      url += "&pageNumber=" + (pageNumber - 1);
      url += "&pageSize=" + funcPageSize;
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
   * Disables the search based on the criteria of the search fields. If all are empty (and there is no country selected), it's disabled.
   */
  const isSearchDisabledFunction = () => {
    setIsSearchDisabled(startsWith.current === "" && endsWith.current === "" && contains.current === "" && countries.length === 0);
  }

  /**
 * Recreates the name array with favorites included, creates the new name objects array.
 * @param index the index of the name object to be favorited.
 */
  const buildFavorites = (index: number) => {
    //assign the favorite to the name objects
    var nos: FirstName[] = [];
    nameObjects.forEach(val => nos.push(Object.assign({}, val)));
    var no = nos[index];
    no.favorite = !no.favorite;
    nos[index] = no;
    setNameObjects(nos);

    //reconstruct the fav names array
    var favs: FirstName[] = [];
    favoriteNames.forEach(val => {
      if ((val.name === no.name && val.gender === no.gender && !no.favorite)) {
        //removing a favorite
      } else {
        favs.push(Object.assign({}, val));
      }
    });
    if (no.favorite) {
      favs.push(Object.assign({}, no));
    }

    //sort the fav names
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

  /**
   * Removes a favorite name from the drawer and updates the name objects.
   * @param providedName the provided name to be removed from favorites.
   */
  const removeFavorite = (providedName: FirstName) => {
    //assign the favorite to the name objects
    var nos: FirstName[] = [];
    var foundIndex = -1;
    nameObjects.forEach((val, index) => {
      nos.push(Object.assign({}, val))
      if (providedName.name === val.name && providedName.gender === val.gender) {
        foundIndex = index;
      }
    });

    if (foundIndex > -1) {
      var no = nos[foundIndex];
      no.favorite = false;
      nos[foundIndex] = no;
      console.log("removing from favs: " + no.name);
      setNameObjects(nos);
    }
    

    //reconstruct the fav names array
    var favs: FirstName[] = [];
    favoriteNames.forEach(val => {
      if ((val.name === providedName.name && val.gender === providedName.gender)) {
        //removing a favorite
      } else {
        favs.push(Object.assign({}, val));
      }
    });

    //sort the fav names
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

  /**
   * Removes a favorite name from the drawer and updates the name objects.
   * @param providedName the provided name to be removed from favorites.
   */
  const removeAllFavorites = () => {
    //assign the favorite to the name objects
    var nos: FirstName[] = [];
    nameObjects.forEach((val, index) => {
      var no = val;
      no.favorite = false;
      nos.push(Object.assign({}, val));
    });
    
    setNameObjects(nos);
    setFavoriteNames([]);
  }

  /**
   * Hook to pull the favorite names from the user's local storage.
   */
  useEffect(() => {
    const favouritesData = window.localStorage.getItem("FAVOURITE_NAMES");
    if (favouritesData === null) {
      return;
    }
    var parsedFavs: FirstName[] = JSON.parse(favouritesData);
    setFavoriteNames(parsedFavs);
  }, [])

  /**
   * Hook to push the favorite names to the user's local storage.
   */
  useEffect(() => {
    window.localStorage.setItem("FAVOURITE_NAMES", JSON.stringify(favoriteNames));
  }, [favoriteNames])

  return (
    <>
      <Box className="background" padding={4}>
        <Grid templateAreas={{
          base: `"main main main main main main main main"`,
          md: `"aside main main main main main main aside2"`,
          lg: `"aside main main main main main main aside2"`,
          xl: `"aside aside main main main main aside2 aside2"`
        }}
        templateColumns='repeat(8, 1fr)'>
          <Show above="lg">
            <GridItem area="aside"></GridItem>
          </Show>
          <GridItem area="main">
            <Grid templateColumns='repeat(10, 1fr)' alignItems="baseline" padding={0}>
              <GridItem colStart={1} colSpan={1} alignItems="start">
                  <FavouritesDrawer favorites={favoriteNames} removeFavoriteFunction={removeFavorite} removeAllFavoritesFunction={removeAllFavorites}></FavouritesDrawer>
              </GridItem>
              <GridItem colStart={2} colSpan={8}>
                <Heading size="3xl">NameNest</Heading>
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
            <FindButton onClick={() => getNameCountAndFirstNamePage()} isDisabled={isSearchDisabled} />
            <br></br>
          </GridItem>
          <Show above="lg">
            <GridItem area="aside2"></GridItem>
          </Show>
        </Grid>
      </Box>
      <NameList nameCount={nameCount} nameObjects={nameObjects} searchExecuted={searchExecuted} pageSize={pageSize}
        pageNumber={pageNumber} setPageNumber={setPageNumber} setPageSize={setPageSize} pageClickFunction={getNames}
        pageSizeFunction={getNamesPageSize} buildFavorites={buildFavorites}/>
    </>
  );
}

export default App;
