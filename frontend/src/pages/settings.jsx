import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SettingsPage({ setButtons }) {
  const navigate = useNavigate();
  
  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/search", {
      method: "POST",
      body: formData,
    });

    const data = await response.json(); 
    const pageNumbers = data.results.map(item => item.page);
    setButtons(pageNumbers); 
    navigate("/");
  };

  return (
    <div className='bg-amber-50'>
      <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
    </div>
  );
}