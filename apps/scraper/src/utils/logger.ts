import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const logDir = path.resolve(process.cwd(), "logs");

export const logger = createLogger({
    level: "info",
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(logDir, "tournaments-%DATE%.log"), // log file per day
            datePattern: "YYYY-MM-DD", // rotate daily
            zippedArchive: true, // compress old logs
            maxSize: "20m", // max size per log file
            maxFiles: "14d", // keep logs for 14 days
        }),
    ],
});
