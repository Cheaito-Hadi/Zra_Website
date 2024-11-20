import {Input} from "@material-tailwind/react";

const customInput = ({label, type}) => {
    return (
        <div className="mb-4">
            <Input
                label={label}
                type={type || "text"}
                className="w-full"
            />
        </div>
    );
};

export default customInput;
