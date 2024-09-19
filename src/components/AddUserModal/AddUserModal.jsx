import { useState } from "react";
import Modal from "@mui/material/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "./modalinput.css";

export default function AddUserModal({ open, handleClose }) {
  const [user, setUser] = useState({
    profileimg: "", // Add file input if needed
    first: "",
    middle: "",
    last: "",
    email: "",
    landmark: "",
    contact: "",
    aboutus: "",
    otherLinks: [],
  });

  const [currentLink, setCurrentLink] = useState({ icon: "", title: "", urlLink: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleCurrentLinkChange = (e) => {
    const { name, value } = e.target;
    setCurrentLink({ ...currentLink, [name]: value });
  };

  const handleAddLink = () => {
    if (currentLink.icon && currentLink.title && currentLink.urlLink) {
      setUser({
        ...user,
        otherLinks: [...user.otherLinks, currentLink],
      });
      setCurrentLink({ icon: "", title: "", urlLink: "" });
    } else {
      alert("Please fill in all fields before adding a link");
    }
  };

  const handleSubmit = async () => {
    // Validate data before sending it
    if (!user.first || !user.email || !user.contact) {
      setError("Please fill in all required fields.");
      return;
    }

    // If the profile image is a file, you can use FormData to send it
    const formData = new FormData();
    formData.append("profileimg", user.profileimg); // handle profile image upload
    formData.append("first", user.first);
    formData.append("middle", user.middle);
    formData.append("last", user.last);
    formData.append("email", user.email);
    formData.append("landmark", user.landmark);
    formData.append("contact", user.contact);
    formData.append("aboutus", user.aboutus);
    formData.append("otherLinks", JSON.stringify(user.otherLinks)); // Convert array to string

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://tapmize.onrender.com/api/v1/profile/save-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("User data saved:", response.data);
      setLoading(false);
      handleClose(); // Close the modal on success
    } catch (err) {
      console.error("Error saving user:", err);
      setError("Failed to save user data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <ModalDialog
        color="neutral"
        sx={{
          width: "80%",
          maxHeight: "90vh",
          overflowY: "auto",
          p: 4,
        }}
      >
        <ModalClose onClick={handleClose} />
        <Typography variant="h6" gutterBottom>
          Add New User
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <div className="inputfiled">
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            name="first"
            value={user.first}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Middle Name"
            variant="outlined"
            fullWidth
            name="middle"
            value={user.middle}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="last"
            value={user.last}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={user.email}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Landmark"
            variant="outlined"
            fullWidth
            name="landmark"
            value={user.landmark}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="Contact"
            variant="outlined"
            fullWidth
            name="contact"
            value={user.contact}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            label="About Us"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            name="aboutus"
            value={user.aboutus}
            onChange={handleChange}
            margin="normal"
          />

          <Typography variant="subtitle1" gutterBottom>
            Other Links
          </Typography>
          <div className="link-section">
            <select
              value={currentLink.icon}
              onChange={handleCurrentLinkChange}
              name="icon"
              className="icon-select"
            >
              <option value="">Select Icon</option>
              <option value="Email">Email</option>
              <option value="Whatsapp">Whatsapp</option>
              <option value="Phone">Phone</option>
              <option value="Website">Website</option>
              <option value="Instagram">Instagram</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Youtube">Youtube</option>
              <option value="Twitter">Twitter</option>
              <option value="Catalog">Catalog</option>
              <option value="Portfolio">Portfolio</option>
              <option value="GooglePay">GooglePay</option>
              <option value="PhonePay">PhonePay</option>
            </select>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              name="title"
              value={currentLink.title}
              onChange={handleCurrentLinkChange}
              margin="normal"
            />
            <TextField
              label="URL Link"
              variant="outlined"
              fullWidth
              name="urlLink"
              value={currentLink.urlLink}
              onChange={handleCurrentLinkChange}
              margin="normal"
            />
          </div>
          <Button
            variant="outlined"
            onClick={handleAddLink}
            style={{ marginTop: "1rem" }}
          >
            Add Another Link
          </Button>

          {user.otherLinks.length > 0 && (
            <div>
              <Typography variant="subtitle1" gutterBottom style={{ marginTop: '2rem' }}>
                Added Links
              </Typography>
              <ul>
                {user.otherLinks.map((link, index) => (
                  <li key={index}>
                    {link.icon}: {link.title} - {link.urlLink}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ marginTop: "1.5rem", backgroundColor: "#007bff" }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add User"}
        </Button>
      </ModalDialog>
    </Modal>
  );
}
