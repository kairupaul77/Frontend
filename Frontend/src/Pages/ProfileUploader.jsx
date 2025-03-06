import { useState, useEffect } from "react";
import { Camera, Edit } from "lucide-react";

export default function ProfileUploader({ userEmail }) {
  const storedImage = localStorage.getItem(`profileImage_${userEmail}`);
  const [image, setImage] = useState(storedImage || null);

  useEffect(() => {
    if (image) {
      localStorage.setItem(`profileImage_${userEmail}`, image);
    }
  }, [image, userEmail]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute right-10 top-10 flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="fileUpload"
        onChange={handleImageUpload}
      />
      <label htmlFor="fileUpload" className="cursor-pointer relative group">
        <div className="w-32 h-32 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-200">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera size={48} className="text-gray-400" />
          )}
        </div>
        <div className="absolute bottom-2 right-2 bg-gray-700 p-1 rounded-full opacity-75 group-hover:opacity-100 transition">
          <Edit size={16} className="text-white" />
        </div>
      </label>
    </div>
  );
}
