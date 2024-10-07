import React, { useState } from "react";
import { notification } from "antd";
import NavBar from "../../components/NavBar/NavBar";
import SearchButton from "../../components/SearchButton/SearchButton";
import API from "../../api/api";
import SearchInput from "../../components/SearchInput/SearchInput";

const AddPage = () => {
    const [url, setUrl] = useState("");

    const handleParsePage = async () => {
        try {
            const data = await API.parsePage(url);
            setUrl("");

            notification.success({
                message: "Успех!",
                description: "Страница успешно обработана.",
            });

            console.log(data);
        } catch (error) {
            notification.error({
                message: "Ошибка!",
                description: "Произошла ошибка при обработке страницы.",
            });
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
            }}
        >
            <NavBar />

            <h1>Добавить элемент</h1>

            <SearchInput
                value={url}
                setValue={setUrl}
                placeholder={"Введите URL..."}
            />

            <SearchButton
                onClick={handleParsePage}
                description={"Обработать"}
            />
        </div>
    );
};

export default AddPage;
