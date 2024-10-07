import { Button } from "antd";

const SearchButton = ({ onClick, description }) => {
    return (
        <Button type="primary" onClick={onClick} style={{ width: 340 }}>
            {description}
        </Button>
    );
};

export default SearchButton;
