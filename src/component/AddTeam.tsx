import React, { useState } from "react";
import "./index.css";
// interface for FormData
interface FormData {
  name: string;
  company: string;
  status: string;
  notes: string;
  lastUpdate: string;
}
// interface for AddTeam components
interface AddTeamProps {
  isOpen: boolean;
  onClose: () => void;
}
// Add Team member components
const AddTeam: React.FC<AddTeamProps> = (props: AddTeamProps) => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    status: "",
    notes: "",
    lastUpdate: "",
  });
// to handle formdata in add team components
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
// to handle cancel button in popup
  const handleCancel = () => {
    setFormData({
      name: "",
      company: "",
      status: "",
      notes: "",
      lastUpdate: "",
    });
    props.onClose();
  };
// to save input in localStorage 
  const handleSave = () => {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() +
      1}/${current.getFullYear()}`;

    formData.lastUpdate = date;
    const storedData = JSON.parse(localStorage.getItem("tableData") || "[]");
    setData(storedData);
    const newData = [...storedData, formData];
    localStorage.setItem("tableData", JSON.stringify(newData));

    props.onClose();
  };

  if (!props.isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close" onClick={handleCancel}>
          &times;
        </span>
        <h2>Add Members</h2>
        <div>Name: </div>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <br />
        <div>Company: </div>
        <div>
          {" "}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </div>

        <br />
        <div>Status: </div>
        <div>
          {" "}
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div>Notes: </div>
        <div>
          {" "}
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </div>

        <br />
        <div className="floatRight">
          <button className="CancelBtn" onClick={handleCancel}>
            Cancel
          </button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddTeam;
