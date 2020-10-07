import * as http from 'http';
import * as path from 'path';
import server from "./server";
import * as dotenv from 'dotenv';
import errorHandler from "./@middlewares/errorHandler";
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const PORT = process.env.APP_PORT;
const app = http.createServer(server.app);

server.routes();
server.app.use(errorHandler)

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
}) 