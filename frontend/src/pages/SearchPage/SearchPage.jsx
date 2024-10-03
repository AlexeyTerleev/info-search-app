import React, { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Input, Button } from "antd";
import API from "../../api/api";
import { SearchOutlined } from "@ant-design/icons";

const SearchPage = () => {
    const [pages, setPages] = useState([]);
    const [value, setValue] = useState("");

    const handleSeacrh = async () => {
        try {
            const response = await API.search(value);
            const data = await response.data;
            setPages(data);
            console.log(data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };

    return (
        <div>
            <NavBar />
            <h1>Список страниц</h1>
            <div>
                <Input
                    placeholder="Поиск..."
                    style={{ width: 200 }}
                    prefix={<SearchOutlined />}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            {pages.length > 0 ? (
                <ul>
                    {pages.map((page) => (
                        <li key={page.url}>
                            <h2>{page.title}</h2>
                            <p>
                                Последнее обновление:{" "}
                                {new Date(page.last_scraped).toLocaleString()}
                            </p>
                            <a
                                href={page.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Перейти
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Загрузка страниц...</p>
            )}

            <Button
                type="primary"
                onClick={handleSeacrh}
                style={{ width: "20%" }}
            >
                Обработать
            </Button>
        </div>
    );
};

export default SearchPage;
