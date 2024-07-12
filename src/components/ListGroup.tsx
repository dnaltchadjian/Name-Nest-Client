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
  Text
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
      <h5>{nameObjects.length} names were found:</h5>
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
              <AccordionPanel pb={4} textAlign="left" key={index}>
                <Card backgroundColor="#ded8cd3d">
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                        Gender: {nameObject.gender}
                        </Heading>
                      </Box>
                      <Box>
                          {nameObject.countryMap["0"]?.length > 0 && <Text>Frequency 0: {nameObject.countryMap["0"]}</Text>}
                          {nameObject.countryMap["-1"]?.length > 0 && <Text>Frequency 1: {nameObject.countryMap["-1"]}</Text>}
                          {nameObject.countryMap["-2"]?.length > 0 && <Text>Frequency 2: {nameObject.countryMap["-2"]}</Text>}
                          {nameObject.countryMap["-3"]?.length > 0 && <Text>Frequency 3: {nameObject.countryMap["-3"]}</Text>}
                          {nameObject.countryMap["-4"]?.length > 0 && <Text>Frequency 4: {nameObject.countryMap["-4"]}</Text>}
                          {nameObject.countryMap["-5"]?.length > 0 && <Text>Frequency 5: {nameObject.countryMap["-5"]}</Text>}
                          {nameObject.countryMap["-6"]?.length > 0 && <Text>Frequency 6: {nameObject.countryMap["-6"]}</Text>}
                          {nameObject.countryMap["-7"]?.length > 0 && <Text>Frequency 7: {nameObject.countryMap["-7"]}</Text>}
                          {nameObject.countryMap["-8"]?.length > 0 && <Text>Frequency 8: {nameObject.countryMap["-8"]}</Text>}
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

export default ListGroup;
