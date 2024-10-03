import { Link, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";
import { PlusOutlined, InfoCircleOutlined, SearchOutlined } from "@ant-design/icons";

const { Header } = Layout;

const NavBar = () => {
    const location = useLocation();

    const getSelectedKey = () => {
        return location.pathname !== "/" ? location.pathname : "/add"
    };

    return (
        <Header style={{ background: "#fff", padding: 0 }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 20px",
                }}
            >
                <Menu mode="horizontal" selectedKeys={[getSelectedKey()]}>
                    <Menu.Item key="/add" icon={<PlusOutlined />}>
                        <Link to="/add">Добавить</Link>
                    </Menu.Item>
                    <Menu.Item key="/help" icon={<InfoCircleOutlined />}>
                        <Link to="/help">Справка</Link>
                    </Menu.Item>
                    <Menu.Item key="/search" icon={<SearchOutlined />}>
                        <Link to="/search">Поиск</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    );
};

export default NavBar;
