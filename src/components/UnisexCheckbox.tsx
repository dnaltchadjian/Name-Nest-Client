import { Box, Checkbox, HStack } from "@chakra-ui/react";

interface Props {
  gender: string;
  isUnisex: boolean;
  setValue: (arg0: boolean) => void;
}

const UnisexCheckbox = ({ gender, isUnisex, setValue }: Props) => {
  if (gender === "All") {
    return null;
  }
  return (
    <>
    <Box height="5px"></Box>
    <HStack spacing="25px" display="inline-block">
        <Checkbox
        isChecked={isUnisex}
        colorScheme="green"
        onChange={() => setValue(!isUnisex)}>Include unisex names</Checkbox>
    </HStack>
    </>
  );
};

export default UnisexCheckbox;
