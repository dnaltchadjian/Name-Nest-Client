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
  Spacer,
  Stack,
  StackDivider,
  Tooltip,
} from "@chakra-ui/react";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import NameGraph from "./NameGraph";
import { Pagination, TablePagination } from "@mui/material";
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

function NameList({ nameObjects, nameCount, pageNumber, pageSize, searchExecuted, setPageNumber, setPageSize, pageClickFunction, pageSizeFunction, buildFavorites }: Props) {

  if (!searchExecuted) {
    return (<></>);
  }

  if (nameObjects === null || nameObjects.length === 0) {
    return (
      <>
        <Heading size="sm">No names could be found with this criteria.</Heading>
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
  }


  const getForebearsLink = (nameObject: FirstName) => {
    return "http://forebears.io/forenames/" + nameObject.name;
  }

  return (
    <>
      <Center>
        <Heading size="xs">{(pageNumber - 1) * pageSize + 1} - {Math.min((pageNumber * pageSize), nameCount)} of {nameCount} names</Heading>
      </Center>
      <Grid templateColumns='repeat(6, 1fr)'>
        <GridItem colStart={2} colEnd={6}>
          <Center>
            <Pagination count={Math.ceil(nameCount / pageSize)}
              variant="outlined"
              shape="rounded"
              siblingCount={0}
              onChange={(e, page) => handlePageChange(page)}
              page={pageNumber}></Pagination>
          </Center>
        </GridItem>
        <GridItem colStart={6} colEnd={6}>
          <ReactSelect
            options={pageOptions}
            defaultValue={pageOptions[0]}
            isSearchable={false}
            onChange={(e) => (handlePageSizeChange(parseInt(e?.value!)))}>
            </ReactSelect>
        </GridItem>
      </Grid>
      <br></br>
      <br></br>
      <Accordion defaultIndex={[]} allowMultiple>
        {nameObjects?.map((nameObject, index) => (
          <React.Fragment key={index.toString()}>
            <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Heading size="sm" marginTop="0.5rem">
                    {nameObject.name}
                    </Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              <AccordionPanel pb={4} textAlign="left">
                <Card backgroundColor={ColorConstants.PALE_OAK_DARK}>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <HStack>
                        <Heading size='sm' textTransform='uppercase'>
                          {NameUtil.getGenderFull(nameObject.gender)}
                        </Heading>
                        <Spacer></Spacer>
                        <HStack>
                          <Tooltip label='Forebears.io search' fontSize='md'>
                            <Link href={getForebearsLink(nameObject)} target="#">
                              <Image src="/forebears-icon-filled-256.webp" boxSize='25px' borderRadius="2px"/>
                            </Link>
                          </Tooltip>
                          <Button rightIcon={<FaStar color={nameObject.favorite ? ColorConstants.GOLD : "#000000"}></FaStar>}
                          size="sm" onClick={() => {buildFavorites(index)}}>
                            Favorite
                          </Button>
                        </HStack>
                      </HStack>
                      <Box>
                        <NameGraph nameObject={nameObject}></NameGraph>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </AccordionPanel>
            </AccordionItem>
          </React.Fragment>
        ))}
      </Accordion>
    </>
  );
}

const logMap = (map: Map<string, string>) => {
  map.forEach((value: string, key: string) => {
    console.log(key);
  });
}

export default NameList;
