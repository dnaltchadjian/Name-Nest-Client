interface Props {
    //setValue: (arg0: string) => void;
}

const CountryDropdown = ({  }: Props) => {
    return (
        <>
        <div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Selected countries
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Armenia<input type="checkbox"></input></a></li>
            </ul>
        </div>
        </>
    );
}
  
export default CountryDropdown;