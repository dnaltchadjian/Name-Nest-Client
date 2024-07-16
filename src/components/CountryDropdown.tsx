import { Box, FormLabel, Stack } from "@chakra-ui/react";
import ReactSelect, { components, MultiValue } from "react-select";

interface Props {
    setCountries: (arg0: string[]) => void;
}

const countryOptions = [
    { value: 'albania', label: 'Albania' },
    { value: 'arabia/persia', label: 'Arabia / Persia' },
    { value: 'armenia', label: 'Armenia' },
    { value: 'austria', label: 'Austria' },
    { value: 'azerbaijan', label: 'Azerbaijan' },
    { value: 'belarus', label: 'Belarus' },
    { value: 'belarus2', label: 'Belarus2' },
    { value: 'belarus3', label: 'Belarus3' },
    { value: 'belarus4', label: 'Belarus4' },
]

const CountryDropdown = ({ setCountries }: Props) => {

    const handleChange = (e: MultiValue<{ value: string; label: string; icon: string; } | { value: string; label: string; icon?: undefined; }>, ) => {
        var countriesArray = [];
        for (var i = 0; i < e.length; i++) {
            countriesArray[i] = e[i].value;
        }
        setCountries(countriesArray);
    }

    return (
        <>
            <Stack>
                <Box>
                    <FormLabel>Occurs in countries (leave blank for all)</FormLabel>
                </Box>
                <Box>
                    <ReactSelect
                    options={countryOptions}
                    isMulti={true}
                    isSearchable={true}
                    closeMenuOnSelect={false}
                    onChange={(e) => handleChange(e)}
                    >             
                </ReactSelect>
            </Box>
          </Stack>
        </>
    );
}
  
export default CountryDropdown;