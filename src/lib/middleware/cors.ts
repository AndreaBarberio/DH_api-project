import cors from "cors";


export function initCorsMiddleware(){
    const corsOption = {
        origin: "http://localhost:8080",
        credentials: true,
    };
    return cors(corsOption);
}