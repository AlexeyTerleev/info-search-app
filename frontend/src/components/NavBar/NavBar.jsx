import React from "react";
import { Layout, Menu } from "antd";
import {
    SearchOutlined,
    PlusOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Header } = Layout;

const NavBar = () => {
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
                <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                    <Menu.Item key="1" icon={<PlusOutlined />}>
                        <Link to="/add">Добавить</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<InfoCircleOutlined />}>
                        <Link to="/help">Справка</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<SearchOutlined />}>
                        <Link to="/search">Поиск</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    );
};

export default NavBar;
