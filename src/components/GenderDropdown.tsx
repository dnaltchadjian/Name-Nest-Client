import { Box, FormLabel, Stack } from "@chakra-ui/react";
import ReactSelect from "react-select";

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
            styles={{
              control: (base) => ({ ...base,
                fontSize: "20px"
              }),
              menuList: (base) => ({
                ...base,
                fontSize: '20px',
              }),
            }}
            options={genderOptions}
            defaultValue={genderOptions[0]}
            isSearchable={false}
            onChange={(e) => (setValue(e?.value?.toString()!))} />
          </Box>
        </Stack>
      </>
    );
  }
  
  export default GenderDropdown;