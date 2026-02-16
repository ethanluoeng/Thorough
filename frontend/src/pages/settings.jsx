import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SettingsPage({ setButtons, setPdfFile }) {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);  

  const handleUpload = async (file, type) => {
    const formData = new FormData();
    formData.append("file", file);
    
    if (!file) return;
    setIsScanning(true); // Start universal animation
    
    if (type === "search") {
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        body: formData,
      });

      const data = await response.json(); 
      const pageNumbers = data.results.map(item => item.page);
      setButtons(pageNumbers);
    }
    if (file && type === "upload-textbook") {
      const localUrl = URL.createObjectURL(file);
      setPdfFile(localUrl);
      setButtons([1]);

      const response = await fetch("http://localhost:8000/upload-textbook", {
        method: "POST",
        body: formData,
      });
    }
    setIsScanning(false); 
    navigate("/");
  };

  return (
    <div className="min-h-screen p-12 space-y-8 font-mono">
      {/* Section Header */}
      <div className="border-l-2 border-orange-500 pl-4 mb-12">
        <h2 className="text-stone-500 uppercase tracking-[0.2em] text-sm font-bold">Settings</h2>
        <h1 className="text-white text-3xl font-light">Upload Files</h1>
      </div>

      <div className="grid gap-6 max-w-2xl">
        {/* Search/Query Upload */}
        <div className="group relative">
          <label className="flex flex-col items-center justify-center w-full h-32 border border-stone-800 bg-stone-900/30 rounded-xl cursor-pointer hover:bg-stone-900/50 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-xs text-stone-700 uppercase tracking-widest">Inquiry Module</p>
              <p className="text-sm text-stone-300"><span className="font-bold text-orange-400">Upload Query</span> or drag and drop</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => handleUpload(e.target.files[0], "search")} 
            />
          </label>
        </div>

        {/* Textbook/Manifest Upload */}
        <div className="group relative">
          <label className="flex flex-col items-center justify-center w-full h-32 border border-stone-800 bg-stone-900/30 rounded-xl cursor-pointer hover:bg-stone-900/50 hover:border-orange-500/50 transition-all duration-300 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-xs text-stone-700 uppercase tracking-widest">Main Archive</p>
              <p className="text-sm text-stone-300"><span className="font-bold text-orange-400">Update Textbook</span> to database</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              onChange={(e) => handleUpload(e.target.files[0], "upload-textbook")} 
            />
          </label>
        </div>
      </div>
      <div>
        {isScanning && <div className="animate-scan z-10" />}
      </div>
    </div>
  );
}