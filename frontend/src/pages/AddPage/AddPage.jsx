import React, { useState } from "react";
import { Input, notification, Button } from "antd";
import NavBar from "../../components/NavBar/NavBar";
import API from "../../api/api";

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
                minHeight: "100vh",
            }}
        >
            <NavBar />
            <h2 style={{ marginBottom: "20px" }}>Добавить элемент</h2>
            <Input
                placeholder="Введите URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                    width: "100%",
                    maxWidth: "400px",
                    marginBottom: "20px",
                }}
            />
            <Button
                type="primary"
                onClick={handleParsePage}
                style={{ width: "20%" }}
            >
                Обработать
            </Button>
        </div>
    );
};

export default AddPage;
