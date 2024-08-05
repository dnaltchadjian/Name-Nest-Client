import { Box, FormLabel, Stack } from "@chakra-ui/react";
import ReactSelect, { MultiValue } from "react-select";
import { NameUtil } from "../util/NameUtil";

interface Props {
    setCountries: (arg0: string[]) => void;
    isSearchDisabledFunction: () => void;
}

const CountryDropdown = ({ setCountries, isSearchDisabledFunction }: Props) => {

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
                    <FormLabel display="inline-block">Occurs in countries (leave blank for all)</FormLabel>
                </Box>
                <Box>
                    <ReactSelect
                    options={NameUtil.labelledCountries}
                    isMulti={true}
                    isSearchable={true}
                    closeMenuOnSelect={false}
                    onChange={(e) => handleChange(e)}
                    onMenuClose={() => isSearchDisabledFunction()}
                    onFocus={() => isSearchDisabledFunction()}
                    styles={{
                        control: (base) => ({ ...base,
                          fontSize: "20px"
                        }),
                        menuList: (base) => ({
                            ...base,
                            fontSize: '20px',
                        }),
                    }}
                    />
                </Box>
          </Stack>
        </>
    );
}
  
export default CountryDropdown;