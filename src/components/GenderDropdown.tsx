interface Props {
  gender: string;
  setValue: (arg0: string) => void;
}

const GenderDropdown = ({ gender, setValue }: Props) => {

    return (
      <>
      <label>Gender:</label>
      <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {gender}
        </button>
        <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#" onClick={e => setValue("All")}>All</a></li>
            <li><a className="dropdown-item" href="#" onClick={e => setValue("Male")}>Male</a></li>
            <li><a className="dropdown-item" href="#" onClick={e => setValue("Female")}>Female</a></li>
        </ul>
      </div>
      </>
    );
  }
  
  export default GenderDropdown;