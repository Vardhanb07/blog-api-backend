const app = require("./app")

const port = process.env.PORT || 20000;

app.listen(port, () => console.log(`localhost: http://localhost:${port}`));