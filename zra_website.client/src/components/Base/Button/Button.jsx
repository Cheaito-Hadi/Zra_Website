import {Button} from "@material-tailwind/react";

const CustomButton = ({label, loading, color}) => {
    return (
        <Button color={color} className="mt-4 w-full">
            {loading ? <span className="spinner"></span> : label}
        </Button>
    );
};

export default CustomButton;
