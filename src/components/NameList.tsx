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
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { FaStar } from "@react-icons/all-files/fa/FaStar";
import NameGraph from "./NameGraph";
import { Pagination } from "@mui/material";
import { NameUtil } from "../util/NameUtil";

interface Props {
  nameObjects: FirstName[];
  nameCount: number;
  pageNumber: number;
  searchExecuted: boolean;
  setPageNumber: (pageNumber: number) => void;
  pageClickFunction: (pageNumber: number) => void;
  favoriteFunction: (name: string) => void;
}

function NameList({ nameObjects, nameCount, pageNumber, searchExecuted, setPageNumber, pageClickFunction, favoriteFunction }: Props) {
  
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
          <>
            <AccordionItem key={"" + index}>
              <Heading size="xs">
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {nameObject.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4} textAlign="left">
                <Card backgroundColor="#d1c6b2">
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Grid templateColumns="repeat(6, 1fr)">
                        <GridItem colSpan={1}>
                          <Heading size='sm' textTransform='uppercase'>
                          {NameUtil.getGenderFull(nameObject.gender)}
                          </Heading>
                        </GridItem>
                        <GridItem colStart={6} colEnd={6} textAlign="right">
                          <Button rightIcon={<FaStar/>} size="sm" onClick={() => favoriteFunction(nameObject.name)}>
                            Favorite
                          </Button>
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
          </>
        ))}
      </Accordion>
    </>
  );
}

export default NameList;
