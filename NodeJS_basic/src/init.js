import "./db";
import app from "./index"

const PORT = 5000;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT}💖`);

app.listen(PORT, handleListening);