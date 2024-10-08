const Metrics = () => {
    return (
        <div
            style={{
                padding: "20px",
                backgroundColor: "#f9f9f9",
                border: "1px solid #dcdcdc",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                maxWidth: "200px",
                height: "150px",
            }}
        >
            <h3>Метрики:</h3>
            <ul>
                <li>
                    <strong>Recall:</strong> 1
                </li>
                <li>
                    <strong>Precision:</strong> 1
                </li>
                <li>
                    <strong>Accuracy:</strong> 1
                </li>
                <li>
                    <strong>Error:</strong> 0
                </li>
                <li>
                    <strong>F-measure:</strong> 1
                </li>
            </ul>
        </div>
    );
};

export default Metrics;
