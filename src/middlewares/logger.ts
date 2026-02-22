import fs from "node:fs";
const REQUEST_LOG_PATH = `./request_log.txt`;
console.log(REQUEST_LOG_PATH, " REQUEST_LOG_PATH");

const Logger = (req: any, res: any, next: any) => {
  const logs = {
    method: req.method,
    url: req.url,
    header: req.headers,
    timeStamp: new Date().toISOString(),
  };
  if (!fs.existsSync(REQUEST_LOG_PATH)) {
    fs.writeFile(REQUEST_LOG_PATH, "", (err) => {
      if (err) {
        console.error("Error creating log file:", err);
      }
    });
  }
  fs.appendFile(REQUEST_LOG_PATH, `${JSON.stringify(logs)}\n`, (err) => {
    if (err) {
      console.log(err, " error in logging");
    }
  });
  next();
};

export default Logger;
