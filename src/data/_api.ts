import { appConfig } from "@/utils/app-config";
import axios from "axios";

const api = axios.create({
    baseURL: appConfig.apibaseUrl,
});

api.interceptors.request.use((config) => {
    // object yang diharapkan di setiap project
    /*
      contoh nama project
      nama-project-webadmin
      nama-project-andon
      nama-project-hmi
    */
    /*
      nama-project-webadmin:{
        token: "token1234"
      }
    */
    const jsonToken = localStorage.getItem(appConfig.localStorageName);

    const jsonParse = jsonToken ? JSON.parse(jsonToken) : { token: null };
    // const auth = localStorageData
    //   ? JSON.parse(localStorageData)
    //   : { token: null };
    config.headers["Authorization"] = `Bearer ${jsonParse.token}`;
    return config;
});

export { api };