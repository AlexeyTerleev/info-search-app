import { Flex } from "antd";

const PageList = ({ pages }) => {
    return (
        <Flex>
            {pages.length > 0 ? (
                <ul>
                    {pages.map((page) => (
                        <li key={page.url}>
                            <h2>{page.title}</h2>
                            <p>
                                <span style={{ fontWeight: "bold" }}>
                                    Последнее обновление:
                                </span>{" "}
                                {new Date(page.last_scraped).toLocaleString()}
                            </p>

                            <div key={page.id}>
                                {page.sameWords.length > 0 && (
                                    <div>
                                        <span style={{ fontWeight: "bold" }}>
                                            Совпадение
                                        </span>
                                        <ul>
                                            {Array.isArray(page.sameWords) &&
                                                page.sameWords.map(
                                                    (sentence, index) => (
                                                        <li key={index}>
                                                            <span>
                                                                {sentence}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                )}
                                {page.wordParts.length > 0 && (
                                    <div>
                                        <span
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Часть слова
                                        </span>
                                        <ul>
                                            {Array.isArray(page.wordParts) &&
                                                page.wordParts.map(
                                                    (sentence, index) => (
                                                        <li key={index}>
                                                            <span>
                                                                {sentence}
                                                            </span>
                                                        </li>
                                                    )
                                                )}
                                        </ul>
                                    </div>
                                )}
                            </div>
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
        </Flex>
    );
};

export default PageList;
