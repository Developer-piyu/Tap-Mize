import "./AdminPage.css"
import MainDash from '../../components/MainDash/MainDash';
import RightSide from '../../components/RigtSide/RightSide';
import Sidebar from '../../components/Sidebar';

function AdminPage() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
        {/* <RightSide/> */}
      </div>
    </div>
  );
}

export default AdminPage;
