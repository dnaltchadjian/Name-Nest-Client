import { Box, FormLabel, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import ReactSelect from "react-select";
import Select from "react-select/dist/declarations/src/Select";

interface Props {
  setValue: (arg0: string) => void;
}

const genderOptions = [
  { id: 'All', value: 'All', label: 'All' },
  { id: 'Male', value: 'Male', label: 'Male' },
  { id: 'Female', value: 'Female', label: 'Female' }
]

const GenderDropdown = ({ setValue }: Props) => {

    return (
      <>
        <Stack>
          <Box>
            <FormLabel display="inline-block">Gender</FormLabel>
          </Box>
          <Box>
          <ReactSelect
            options={genderOptions}
            isSearchable={false}
            onChange={(e) => (setValue(e?.value?.toString()!))}>
          </ReactSelect>
          </Box>
        </Stack>
      </>
    );
  }
  
  export default GenderDropdown;