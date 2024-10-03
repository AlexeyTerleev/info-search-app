import React from "react";
import NavBar from "../../components/NavBar/NavBar";

const HelpPage = () => {
    return (
        <div>
            <NavBar />
            <h2>Справка</h2>
            <p>Добро пожаловать в раздел справки нашего приложения!</p>
            <h3>Как использовать приложение:</h3>
            <ul>
                <li>
                    <strong>Добавить элемент:</strong> Используйте раздел
                    "Добавить", чтобы ввести URL и обработать страницу.
                </li>
                <li>
                    <strong>Справка:</strong> Перейдите в этот раздел, чтобы
                    получить информацию о функционале приложения.
                </li>
                <li>
                    <strong>Поиск:</strong> Используйте раздел "поиск", чтобы
                    найти что вам нужно.
                </li>
            </ul>
        </div>
    );
};

export default HelpPage;
