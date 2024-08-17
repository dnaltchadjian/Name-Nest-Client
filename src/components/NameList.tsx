import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  Show,
  Spacer,
  Stack,
  StackDivider,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import NameGraph from "./NameGraph";
import { Pagination } from "@mui/material";
import { NameUtil } from "../util/NameUtil";
import { ColorConstants } from "../util/ColorConstants";
import React from "react";
import ReactSelect from "react-select";

interface Props {
  nameObjects: FirstName[];
  nameCount: number;
  pageSize: number;
  pageNumber: number;
  searchExecuted: boolean;
  setPageNumber: (pageNumber: number) => void;
  setPageSize: (pageSize: number) => void;
  pageClickFunction: (pageNumber: number) => void;
  pageSizeFunction: (pageSize: number) => void;
  buildFavorites: (index: number) => void;
}

const pageOptions = [
  { id: '10', value: '10', label: '10' },
  { id: '25', value: '25', label: '25' },
  { id: '50', value: '50', label: '50' }
]

const getColorFromGender = (gender: string) => {
    switch(gender) {
      case "M":
        return ColorConstants.BOY_BLUE;
      case "F":
        return ColorConstants.GIRL_PINK;
      default:
        return ColorConstants.UNISEX_ORANGE;
    }
}

const getColorSchemeFromGender = (gender: string) => {
  switch(gender) {
    case "M":
      return "teal";
    case "F":
      return "pink";
    default:
      return "orange";
  }
}

function NameList({ nameObjects, nameCount, pageNumber, pageSize, searchExecuted, setPageNumber, setPageSize, pageClickFunction, pageSizeFunction, buildFavorites }: Props) {

  if (!searchExecuted) {
    return (<></>);
  }

  if (nameObjects === null || nameObjects.length === 0) {
    return (
      <>
        <Box className="background">
          <Heading size="sm">No names could be found with this criteria.</Heading>
        </Box>
      </>
    );
  }

  const handlePageChange = (eventPageNumber: number) => {
    pageClickFunction(eventPageNumber);
    setPageNumber(eventPageNumber);
  }

  const handlePageSizeChange = (eventPageSize: number) => {
    pageSizeFunction(eventPageSize);
    setPageSize(eventPageSize);
    setPageNumber(1);
    
  }


  const getForebearsLink = (nameObject: FirstName) => {
    return "http://forebears.io/forenames/" + nameObject.name;
  }

  return (
    <>
      <Box className="background" padding={2}>
        <Grid templateAreas={{
          base: `"main main main main main"`,
          xl: `"aside main main main aside2"`
        }}
        templateColumns='repeat(5, 1fr)'>
          <Show above="xl">
            <GridItem area="aside"></GridItem>
          </Show>
          <GridItem area="main">
            <Grid templateColumns='repeat(6, 1fr)'>
              <GridItem colStart={2} colEnd={6}>
                <Stack>
                  <Heading size="xs">
                    {(pageNumber - 1) * pageSize + 1} - {Math.min((pageNumber * pageSize), nameCount)} of {nameCount} names
                  </Heading>
                  <Center>
                    <Pagination count={Math.ceil(nameCount / pageSize)}
                      size="small"
                      variant="outlined"
                      shape="rounded"
                      siblingCount={0}
                      onChange={(e, page) => handlePageChange(page)}
                      page={pageNumber}></Pagination>
                    </Center>
                </Stack>
              </GridItem>
              <GridItem colStart={6} colEnd={6}>
                <Text paddingBottom={0} className="react-select-size">
                  Rows per page:
                </Text>
                <ReactSelect className="react-select-size"
                  styles={{
                    control: (base) => ({ ...base,
                      fontSize: "inherit",
                      maxHeight: "15px"
                    }),
                    menuList: (base) => ({
                      ...base,
                      fontSize: '18px',
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      padding: 0,
                    }),
                    indicatorSeparator: (provided) => ({
                      ...provided,
                      maxWidth: '10px',
                    }),
                  }}
                  options={pageOptions}
                  defaultValue={pageOptions[0]}
                  isSearchable={false}
                  onChange={(e) => {handlePageSizeChange(parseInt(e?.value!))}} />
              </GridItem>
            </Grid>
          </GridItem>
          <Show above="xl">
            <GridItem area="aside2"></GridItem>
          </Show>
        </Grid>
      </Box>
      
      <Accordion defaultIndex={[]} allowMultiple>
        {nameObjects?.map((nameObject, index) => (
          <React.Fragment key={index.toString()}>
            <AccordionItem background={getColorFromGender(nameObject.gender)}>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="center">
                    <Heading size="sm" marginTop="0.5rem">
                    {nameObject.name}
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              <AccordionPanel pb={4} textAlign="left">
                <Grid templateAreas={{
                  base: `"main main main main main main"`,
                  lg: `"left main main main main right"`
                }}
                templateColumns='repeat(6, 1fr)'>
                  <Show above="md">
                    <GridItem area="left"></GridItem>
                  </Show>
                  <GridItem area="main">
                    <Card backgroundColor={ColorConstants.ALABASTER} display="flex">
                      <CardBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                          <HStack>
                            <Heading size='sm' textTransform='uppercase'>
                              {NameUtil.getGenderFull(nameObject.gender)}
                            </Heading>
                            <Spacer></Spacer>
                            <HStack>
                              <Tooltip label='Forebears.io search' fontSize='sm'>
                                <Link href={getForebearsLink(nameObject)} target="#">
                                  <Image src="/forebears-icon-filled-256.webp" boxSize='32px' borderRadius="2px"/>
                                </Link>
                              </Tooltip>
                              <Button rightIcon={<FaStar color={nameObject.favorite ? ColorConstants.GOLD : "#FFFFFF"} size="18px"></FaStar>}
                              size="sm" onClick={() => {buildFavorites(index)}} colorScheme={getColorSchemeFromGender(nameObject.gender)}>
                                Favorite
                              </Button>
                            </HStack>
                          </HStack>
                          <NameGraph nameObject={nameObject}></NameGraph>
                        </Stack>
                      </CardBody>
                    </Card>
                  </GridItem>
                  <GridItem>
                    <Show above="md">
                        <GridItem area="right"></GridItem>
                    </Show>
                  </GridItem>
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </React.Fragment>
        ))}
      </Accordion>
    </>
  );
}

export default NameList;
