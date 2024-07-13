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
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import NameGraph from "./NameGraph";

interface Props {
  nameObjects: FirstName[];
}

function NameList({ nameObjects }: Props) {
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

  return (
    <>
      <Heading size="sm">{nameObjects.length} names were found:</Heading>
      <Accordion defaultIndex={[]} allowMultiple key={nameObjects[0]?.name}>
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
              <AccordionPanel pb={4} textAlign="left" key={"" + index}>
                <Card>
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
