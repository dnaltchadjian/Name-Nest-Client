import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

interface Props {
  nameObjects: FirstName[];
}

function ListGroup({ nameObjects }: Props) {
  if (nameObjects === null || nameObjects.length === 0) {
    return (
      <>
        <h2>No names could be found with this criteria.</h2>
      </>
    );
  }
  return (
    <>
      <h3>{nameObjects.length} names were found:</h3>
      <Accordion defaultIndex={[]} allowMultiple>
        {nameObjects?.map((nameObject, index) => (
          <>
            <AccordionItem id={"" + index}>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {nameObject.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} textAlign="left">
                Gender: {nameObject.gender}
                <br></br>
                Weight scale 0: {nameObject.countryMap["0"]}
                <br></br>
                Weight scale 1: {nameObject.countryMap["-1"]}
                <br></br>
                Weight scale 2: {nameObject.countryMap["-2"]}
                <br></br>
                Weight scale 3: {nameObject.countryMap["-3"]}
                <br></br>
                Weight scale 4: {nameObject.countryMap["-4"]}
                <br></br>
                Weight scale 5: {nameObject.countryMap["-5"]}
                <br></br>
                Weight scale 6: {nameObject.countryMap["-6"]}
                <br></br>
                Weight scale 7: {nameObject.countryMap["-7"]}
                <br></br>
                Weight scale 8: {nameObject.countryMap["-8"]?.map((country) => (country + ", "))}
              </AccordionPanel>
            </AccordionItem>
          </>
        ))}
      </Accordion>
    </>
  );
}

export default ListGroup;
