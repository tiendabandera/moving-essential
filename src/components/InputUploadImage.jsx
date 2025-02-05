import { useEffect, useState } from "react";
import { Loader2, Upload, X } from "lucide-react";
import { useController } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";

const InputUploadImage = ({ id, placeholder, name, control, required }) => {
  const [preview, setPreview] = useState({});
  //const [isUploading, setIsUploading] = useState(false);
  const { uploading } = useAuth();

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: required && { required: `${placeholder} is required` },
  });

  const handleImageChange = (e, id) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Remove previous preview for this ID if it exists
    setPreview({});

    // Create new preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const res = { id, url: reader.result, file };
      setPreview(res);
      onChange(res);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview("");
    onChange("");
  };

  useEffect(() => {
    if (!value) {
      setPreview(value);
      return;
    }

    if (value.file) {
      setPreview(value);
      return;
    }

    setPreview({ id, url: value, file: "" });
  }, [value, id]);

  const isUploading = uploading.includes(id);

  return (
    <div className="flex flex-col">
      <div key={id} className="relative">
        <div
          className={`border-2 border-dashed rounded-lg p-4 ${
            preview ? "border-green-500" : "border-gray-300"
          } transition-colors duration-200`}
        >
          {preview ? (
            <div className="relative group">
              <img
                src={preview.url}
                alt={`Preview ${id}`}
                className={`w-full h-36 object-cover rounded-lg ${
                  isUploading ? "opacity-50" : "opacity-100"
                }`}
              />
              {isUploading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 rounded-lg">
                  <Loader2 className="w-12 h-12 text-white animate-spin" />
                </div>
              ) : (
                <button
                  onClick={() => removeImage()}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-36 cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-500 text-center">
                {placeholder || "Upload an image"}
              </span>
              <input
                id={id}
                name={name}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => handleImageChange(e, id)}
              />
            </label>
          )}
        </div>
        {preview.file && (
          <p className="mt-2 text-sm text-gray-500 truncate">
            {preview.file.name}
          </p>
        )}
      </div>
      <div>
        {error && (
          <span className="text-red-500 text-xs font-semibold">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputUploadImage;
