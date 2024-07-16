import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import NameGraph from "./NameGraph";
import { Pagination } from "@mui/material";
import { useState } from "react";

interface Props {
  nameObjects: FirstName[];
  nameCount: number;
  pageNumberFunction: (pageNumber: number) => void;
}

function NameList({ nameObjects, nameCount, pageNumberFunction }: Props) {

  const [pageNumber, setPageNumber] = useState(1);
  
  if (nameObjects === null || nameObjects.length === 0) {
    return (
      <>
        <Heading size="sm">No names could be found with this criteria.</Heading>
      </>
    );
  }

  const getGenderFull = (gender: string) => {
    switch (gender) {
      case "M":
        return "Male";  
      case "1M":
        return "Male if first part of name, otherwise mostly female"
      case "?M":
        return "Mostly male";
      case "F":
        return "Female";
      case "1F":
        return "Female if first part of name, otherwise mostly male"
      case "?F":
        return "Mostly female";
      case "?":
        return "Unisex";
    }
    return "Unknown";
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, eventPageNumber: number) => {
    setPageNumber(eventPageNumber);
    pageNumberFunction(eventPageNumber);
  }

  return (
    <>
      <HStack display="inline-block">
        <Heading size="xs">{(pageNumber - 1) * 10 + 1} - {Math.min((pageNumber * 10), nameCount)} of {nameCount} names</Heading>
        <Pagination count={Math.ceil(nameCount / 10)} variant="outlined" shape="rounded" onChange={handlePageChange}></Pagination>
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
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                        GENDER: {getGenderFull(nameObject.gender)}
                        </Heading>
                      </Box>
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
