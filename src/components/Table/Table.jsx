import { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import AddUserModal from "../AddUserModal/AddUserModal"; // Import the AddUserModal
import "./Table.css";

export default function BasicTable() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [addUserModalOpen, setAddUserModalOpen] = useState(false); // State to handle AddUserModal

  const rowsPerPage = 5;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://tapmize.onrender.com/api/v1/profile/profile"
      );
      if (Array.isArray(response.data.data)) {
        setRows(response.data.data.reverse());
      } else {
        console.error("Expected an array but received:", response.data);
        setRows([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    if (page < Math.ceil(rows.length / rowsPerPage) - 1) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleOpenModal = async (userId) => {
    try {
      const response = await axios.get(
        `https://tapmize.onrender.com/api/v1/profile/${userId}`
      );
      setSelectedUser(response.data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleCopyLink = (userId) => {
    const userLink = `${window.location.origin}/profile/${userId}`
    navigator.clipboard.writeText(userLink)
      .then(() => {
        alert("User link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying user link:", error);
      });
  };

  const handleOpenAddUserModal = () => {
    setAddUserModalOpen(true); // Open Add User Modal
  };

  const handleCloseAddUserModal = () => {
    setAddUserModalOpen(false); // Close Add User Modal
  };

  return (
    <div className="Table">
      <h3 style={{ margin: "1.2rem" }}>
        Profile Details
        <Button
          variant="contained"
          style={{ marginLeft: "1.2rem" }}
          onClick={handleOpenAddUserModal} // Open Add User Modal on click
        >
          Add User
        </Button>
      </h3>

      {alertVisible && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            User Link Copied Successfully.
          </Alert>
        </Stack>
      )}

      {/* Add User Modal */}
      <AddUserModal open={addUserModalOpen} handleClose={handleCloseAddUserModal} />

      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Landmark</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">User Link</TableCell>
              <TableCell align="left">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.first} {row.last}
                  </TableCell>
                  <TableCell align="left">{row.landmark}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleCopyLink(row._id)}>
                      User Link
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button onClick={() => handleOpenModal(row._id)}>
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pagination">
        <Button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
