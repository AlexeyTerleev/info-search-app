import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000",
});

export default class API {
    static getPage(id) {
        return new Promise((resolve, reject) => {
            api.get(`/pages/${id}`)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        });
    }

    static parsePage(url) {
        console.log(url);
        return new Promise((resolve, reject) => {
            api.post(
                `/pages/`,
                { url: url },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => resolve(response.data))
                .catch((error) => reject(error));
        });
    }

    static search(query) {
        return new Promise((resolve, reject) => {
            api.get(`/search/?q=${query}`)
                .then((response) => resolve(response))
                .catch((error) => reject(error));
        });
    }
}
