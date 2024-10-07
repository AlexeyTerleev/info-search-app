import { Flex } from "antd";

const PageList = ({ pages, highlightedWord }) => {
    return (
        <Flex>
            {pages.length > 0 ? (
                <ul>
                    {pages.map((page) => (
                        <li key={page.url}>
                            <h2>{page.title}</h2>
                            <p>
                                Последнее обновление:{" "}
                                {new Date(page.last_scraped).toLocaleString()}
                            </p>
                            <ul>
                                {page.coincidences.map((coincidence) => (
                                    <li key={coincidence}>
                                        {coincidence
                                            .split(" ")
                                            .map((word, index) => (
                                                <span
                                                    key={index}
                                                    style={{
                                                        color: highlightedWord.includes(
                                                            word
                                                        )
                                                            ? "red"
                                                            : "inherit",
                                                    }}
                                                >
                                                    {word}{" "}
                                                </span>
                                            ))}
                                    </li>
                                ))}
                            </ul>
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
