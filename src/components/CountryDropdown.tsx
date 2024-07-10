interface Props {
    //setValue: (arg0: string) => void;
}

const CountryDropdown = ({  }: Props) => {
    return (
        <>
        <div className="dropdown">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                Selected countries
            </button>
            <ul className="dropdown-menu">
                <li><button className="dropdown-item" type="button">Albania</button></li>
                <li><button className="dropdown-item" type="button">Armenia</button></li>
                <li><button className="dropdown-item" type="button">Azerbaijan</button></li>
            </ul>
        </div>
        </>
    );
}
  
export default CountryDropdown;