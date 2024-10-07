import Input from "antd/es/input/Input";
import { SearchOutlined } from "@ant-design/icons";

const SearchInput = ({ value, setValue, placeholder }) => {
    return (
        <Input
            placeholder={placeholder}
            style={{ width: 340, marginBottom: "20px" }}
            prefix={<SearchOutlined />}
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
        />
    );
};

export default SearchInput;
