import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1 style={{margin:"0.5rem"}}>Dashboard</h1>
      {/* <Cards /> */}
      <Table />
    </div>
  );
};

export default MainDash;
