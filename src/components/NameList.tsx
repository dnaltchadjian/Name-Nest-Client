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
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  Stack,
  StackDivider,
  Tooltip,
} from "@chakra-ui/react";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import NameGraph from "./NameGraph";
import { Pagination } from "@mui/material";
import { NameUtil } from "../util/NameUtil";
import { ColorConstants } from "../util/ColorConstants";
import React from "react";

interface Props {
  nameObjects: FirstName[];
  nameCount: number;
  pageNumber: number;
  searchExecuted: boolean;
  setPageNumber: (pageNumber: number) => void;
  pageClickFunction: (pageNumber: number) => void;
  buildFavorites: (index: number) => void;
}

function NameList({ nameObjects, nameCount, pageNumber, searchExecuted, setPageNumber, pageClickFunction, buildFavorites }: Props) {

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

  const handlePageChange = (event: React.ChangeEvent<unknown>, eventPageNumber: number) => {
    pageClickFunction(eventPageNumber);
    setPageNumber(eventPageNumber);
  }

  const getForebearsLink = (nameObject: FirstName) => {
    return "http://forebears.io/forenames/" + nameObject.name;
  }

  return (
    <>
      <HStack display="inline-block">
        <Heading size="xs">{(pageNumber - 1) * 10 + 1} - {Math.min((pageNumber * 10), nameCount)} of {nameCount} names</Heading>
        <Pagination count={Math.ceil(nameCount / 10)} variant="outlined" shape="rounded" onChange={handlePageChange} page={pageNumber}></Pagination>
      </HStack>
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
                      <Grid templateColumns="repeat(6, 1fr)">
                        <GridItem colSpan={1}>
                          <Heading size='sm' textTransform='uppercase'>
                          {NameUtil.getGenderFull(nameObject.gender)}
                          </Heading>
                        </GridItem>
                        <GridItem colStart={6} colEnd={6} textAlign="right">
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
                        </GridItem>
                      </Grid>
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
