const path = require("path");
const fs = require("fs");

export function verifyEnvIntegrity() {
    const envPath = path.join(process.cwd(), ".env");
    const jsonPath = path.join(process.cwd(), "envinfo.json");

    if (!fs.existsSync(envPath)) {
        console.error("The .env file does not exist.");
        return false;
    }

    if (!fs.existsSync(jsonPath)) {
        console.error("The envinfo.json file does not exist.");
        return false;
    }

    const envContent = fs.readFileSync(envPath, "utf8");
    const info = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

    const envVariables: Record<string, string> = {};
    const lines = envContent.split(/\r?\n/);

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine || trimmedLine.startsWith("#")) continue;

        const [key, ...valueParts] = trimmedLine.split("=");
        envVariables[key] = valueParts.join("=").trim();
    }

    let allValid = true;

    for (const attribute of info["dataenv"]) {
        const name = attribute.name;
        const defaultValue = attribute.defaultValue;

        if (!(name in envVariables)) {
            console.error(`Missing variable: ${name}`);
            allValid = false;
            continue;
        }

        if (defaultValue !== undefined && envVariables[name] === "") {
            allValid = false;
        }
    }

    return allValid;
}