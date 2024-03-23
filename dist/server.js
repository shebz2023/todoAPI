"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes/routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = require("./config/config");
const yamljs_1 = __importDefault(require("yamljs"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = config_1.config.server.port;
const MONGO_URL = config_1.config.mongo.url;
app.use(body_parser_1.default.json());
// Enable CORS
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// swagger
const swaggerJsDocs = yamljs_1.default.load('./api.yaml');
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerJsDocs));
// Routes
app.use('/', routes_1.default);
// Healthy check
app.get('/ping', (req, res) => {
    res.json({ "you are": "free to go" });
});
// no request
app.use((req, res, next) => {
    res.status(404).json({ error: 'check the request again' });
});
mongoose_1.default.connect(MONGO_URL)
    .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('MongoDB Connection Error: ', err);
});
exports.default = app;
