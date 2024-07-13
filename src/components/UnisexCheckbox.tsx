import { Box, Checkbox, HStack, Text } from "@chakra-ui/react";

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
    <HStack spacing="25px">
        <Checkbox
        isChecked={isUnisex}
        colorScheme="orange"
        onChange={(e) => setValue(!isUnisex)}>Include unisex names</Checkbox>
    </HStack>
    </>
  );
};

export default UnisexCheckbox;
