import { Box, FormLabel, Stack } from "@chakra-ui/react";
import ReactSelect, { components } from "react-select";
import MultiValue from "react-select/dist/declarations/src/components/MultiValue";

interface Props {
    setValue: (arg0: string) => void;
}

const countryOptions = [
    { value: 'albania', label: 'Albania', icon: "al.svg" },
    { value: 'arabia/persia', label: 'Arabia / Persia' },
    { value: 'armenia', label: 'Armenia' },
    { value: 'austria', label: 'Austria' },
    { value: 'azerbaijan', label: 'Azerbaijan' },
    { value: 'belarus', label: 'Belarus' },
    { value: 'belarus2', label: 'Belarus2' },
    { value: 'belarus3', label: 'Belarus3' },
    { value: 'belarus4', label: 'Belarus4' },
]

const CountryDropdown = ({ setValue }: Props) => {
    return (
        <>
            <Stack>
                <Box>
                    <FormLabel verticalAlign="center">Occurs in countries (leave blank for all)</FormLabel>
                </Box>
                <Box maxWidth="700px">
                    <ReactSelect
                    options={countryOptions}
                    isMulti={true}
                    isSearchable={false}
                    closeMenuOnSelect={false}
                    onChange={(e) => setValue(e?.values?.toString()!)}
                    >             
                </ReactSelect>
            </Box>
          </Stack>
        </>
    );
}
  
export default CountryDropdown;