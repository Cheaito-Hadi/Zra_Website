import { Button } from "@material-tailwind/react";

const CustomButton = ({ label, loading, color, onClick }) => {
    return (
        <Button color={color} className="mt-4 w-full" onClick={onClick}>
            {loading ? <span className="spinner"></span> : label}
        </Button>
    );
};

export default CustomButton;
