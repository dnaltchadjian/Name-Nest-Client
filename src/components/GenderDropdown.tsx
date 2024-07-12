import { Box, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import ReactSelect from "react-select";
import Select from "react-select/dist/declarations/src/Select";

interface Props {
  setValue: (arg0: string) => void;
}

const genderOptions = [
  { value: 'All', label: 'All' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
]

const GenderDropdown = ({ setValue }: Props) => {

    return (
      <>
        <HStack spacing="25px">
          <Box>
            <Text>Gender</Text>
          </Box>
          <Box w="180px">
          <ReactSelect
            options={genderOptions}
            isSearchable={false}
            onChange={(e) => (setValue(e?.value?.toString()!))}>
          </ReactSelect>
          </Box>
        </HStack>
      </>
    );
  }
  
  export default GenderDropdown;