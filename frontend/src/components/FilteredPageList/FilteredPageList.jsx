import React, { useState } from "react";
import { Row, Col } from "antd";
import API from "../../api/api";
import Metrics from "../Metrics/Metrics";
import SearchButton from "../SearchButton/SearchButton";
import SearchInput from "../SearchInput/SearchInput";
import PageList from "../PageList/PageList";

const FilteredPageList = () => {
    const [pages, setPages] = useState([]);
    const [value, setValue] = useState("");

    const handleSearch = async () => {
        try {
            const response = await API.search(value);
            const data = await response.data;
            setPages(data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };

    return (
        <Row gutter={16}>
            <Col flex={1}>
                <h1>Список страниц</h1>

                <div style={{ position: "relative" }}>
                    <SearchInput
                        value={value}
                        setValue={setValue}
                        placeholder={"Поиск..."}
                    />
                    <PageList pages={pages} highlightedWord={value} />
                    <SearchButton
                        onClick={handleSearch}
                        description={"Обработать"}
                    />
                </div>
            </Col>

            <Col
                flex="none"
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "50px",
                }}
            >
                <Metrics />
            </Col>
        </Row>
    );
};

export default FilteredPageList;
