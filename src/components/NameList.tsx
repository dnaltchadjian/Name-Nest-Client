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
                <Card backgroundColor="#ded8cd3d">
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                      <Box>
                        <Heading size='xs' textTransform='uppercase'>
                        Gender: {nameObject.gender}
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
