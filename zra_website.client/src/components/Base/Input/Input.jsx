import { Input } from "@material-tailwind/react";

const CustomInput = ({ label, type, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            <Input
                type={type || "text"}
                value={value}
                onChange={onChange}
                className="w-full"
            />
        </div>
    );
};

export default CustomInput;
