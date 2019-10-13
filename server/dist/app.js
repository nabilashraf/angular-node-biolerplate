"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
exports.app = app;
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const morgan_1 = __importDefault(require("morgan"));
app.use(morgan_1.default('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/api', routes_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(http_errors_1.default(404));
});
// error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.json({ error: err.err, message: err.message, status: err.status });
});
//Angular View
app.get('/*', (req, res) => {
    let indexFilePath = path_1.default.join(__dirname, 'public/index.html');
    if (fs_1.default.existsSync(indexFilePath)) {
        res.sendFile(indexFilePath);
    }
    else {
        res.json({ message: 'Welcome to Angular 8, please move your bundled build to public folder ' });
    }
});
