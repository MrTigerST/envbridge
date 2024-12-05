const path = require('path');
const fs = require("fs");

export function envToJson(): void {
    const envContent = fs.readFileSync(path.join(process.cwd(), '.env'), "utf8");
    const jsonPath = path.join(process.cwd(), "envinfo.json");

    if (!fs.existsSync(envContent)) {
        console.error("The .env file does not exist.");
        return;
    }

    const jsonResult: Record<string, any> = { dataenv: [] };

    const lines = envContent.split(/\r?\n/);
    let lastComment = "";

    for (const line of lines) {
        const trimmedLine = line.trim();

        if (!trimmedLine) continue;

        if (trimmedLine.startsWith("#")) {
            lastComment = trimmedLine.substring(1).trim();
        } else {
            const [key, ...valueParts] = trimmedLine.split("=");
            const value = valueParts.join("=").trim();

            jsonResult.dataenv.push({
                name: key,
                description: lastComment || "",
                defaultValue: value
            });

            lastComment = "";
        }
    }

    fs.writeFileSync(jsonPath, JSON.stringify(jsonResult, null, 4), "utf8");
}