import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Profile.css";
import { SiGmail, SiPhonepe } from "react-icons/si";
import { FaWhatsapp, FaLinkedinIn, FaPinterestP, FaGooglePay, FaPassport, FaLink } from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { RiChromeLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io5";
import { CiTwitter } from "react-icons/ci";
import { BsYoutube } from "react-icons/bs";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  // Mapping icons to their respective React component
  const iconMap = {
    Email: <SiGmail className="profile__icons" />,
    Whatsapp: <FaWhatsapp className="profile__icons" />,
    Phone: <MdOutlinePhoneInTalk className="profile__icons" />,
    Website: <RiChromeLine className="profile__icons" />,
    Instagram: <IoLogoInstagram className="profile__icons" />,
    LinkedIn: <FaLinkedinIn className="profile__icons" />,
    Twitter: <CiTwitter className="profile__icons" />,
    pinterest: <FaPinterestP className="profile__icons" />,
    Catloge: <FaLink className="profile__icons" />,
    Portfolio: <FaPassport className="profile__icons" />,
    GooglePay: <FaGooglePay className="profile__icons" />,
    PhonePay: <SiPhonepe className="profile__icons" />,
    Youtube: <BsYoutube className="profile__icons" />,
    link: <FaLink className="profile__icons" />,
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://tapmize.onrender.com/api/v1/profile/${userId}`);
        setUserProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile__header">
        <div className="profile__left">
          <img src={`${userProfile.profileimg}`} alt="Profile" className="profile__image" />
        </div>
        <div className="profile__right">
          <h2 className="profile__header-title">{userProfile.first} {userProfile.last}</h2>
          <p className="profile__header-subtitle">{userProfile.landmark}</p>
          <p className="profile__header-text">{userProfile.aboutus}</p>
        </div>
      </div>
      <div className="profile__links">
        {userProfile.otherLinks.map((link, index) => (
          <a key={index} href={link.urlLink} className="profile__link" target="_blank" rel="noopener noreferrer">
            {iconMap[link.icon]} {/* Dynamically render the icon */}
            <p>{link.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Profile;
