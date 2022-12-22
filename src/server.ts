import { app } from "./app";
import { AppDataSource } from "./data-source";


AppDataSource.initialize().then(() => {
    console.log("Database connected");
    const PORT = process.env.SERVER_PORT || 3000
    app.listen(PORT, () => console.log(`Server running in port: ${PORT}`))
}).catch((err) => console.error(err))
