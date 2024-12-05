const path = require("path");
const fs = require("fs");

export function BuildInfo() {
    const info = require(path.join(process.cwd(), "envinfo.json"));
    const envPath = path.join(process.cwd(), ".env");

    if (!fs.existsSync(info)) {
        console.error("The envinfo.json file does not exist.");
        return false;
    }


    const existingEnvKeys: Set<string> = new Set();
    let existingEnvContent = "";
    if (fs.existsSync(envPath)) {
        existingEnvContent = fs.readFileSync(envPath, "utf8");
        const lines = existingEnvContent.split(/\r?\n/);

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith("#")) continue;

            const [key] = trimmedLine.split("=");
            existingEnvKeys.add(key);
        }
    }

    let newEnvContent = existingEnvContent.trim();
    for (let i = 0; i < info["dataenv"].length; i++) {
        const currentAttribute = info["dataenv"][i];
        const name = currentAttribute["name"];
        const description = currentAttribute["description"];
        const defaultValue = currentAttribute["defaultValue"];

        if (!existingEnvKeys.has(name)) {
            const lines = `\n\n${description ? `# ${description}\n` : ""}${name}=${defaultValue}`;
            newEnvContent += lines;
        }
    }

    fs.writeFileSync(envPath, newEnvContent.trim() + "\n", "utf8");
}