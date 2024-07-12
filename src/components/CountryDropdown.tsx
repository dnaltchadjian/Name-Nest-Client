import ReactSelect from "react-select";

interface Props {
    setValue: (arg0: string) => void;
}

const countryOptions = [
    { value: 'albania', label: 'Albania' },
    { value: 'arabia/persia', label: 'Arabia / Persia' },
    { value: 'armenia', label: 'Armenia' },
    { value: 'azerbaijan', label: 'Azarbaijan' }
  ]

const CountryDropdown = ({ setValue }: Props) => {
    return (
        <>
            <ReactSelect
            options={countryOptions}
            isMulti={true}
            isSearchable={false}
            closeMenuOnSelect={false}
            // onChange={(e) => setValue(e?.values)}
            >
          </ReactSelect>
        </>
    );
}
  
export default CountryDropdown;