const path = require('path');
const fs = require("fs");

export function envToJson(preserveExisting = false): void {
    const envPath = path.join(process.cwd(), '.env');
    const jsonPath = path.join(process.cwd(), 'envinfo.json');

    if (!fs.existsSync(envPath)) {
        console.error("The .env file does not exist.");
        return;
    }

    let existingJson: Record<string, any> = { dataenv: [] };
    if (preserveExisting && fs.existsSync(jsonPath)) {
        try {
            existingJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        } catch (error) {
            console.error("Error parsing existing envinfo.json file.", error);
            return;
        }
    }

    const envContent = fs.readFileSync(envPath, "utf8");
    const lines = envContent.split(/\r?\n/);
    let lastComment = "";
    const existingKeys = new Set(existingJson.dataenv.map((entry: any) => entry.name));

    for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith("#")) {
            lastComment = trimmedLine.substring(1).trim();
        } else {
            const [key, ...valueParts] = trimmedLine.split("=");
            const value = valueParts.join("=").trim();

            if (!preserveExisting || !existingKeys.has(key)) {
                existingJson.dataenv.push({
                    name: key,
                    description: lastComment || "",
                    defaultValue: value
                });
            }
            lastComment = "";
        }
    }

    fs.writeFileSync(jsonPath, JSON.stringify(existingJson, null, 4), "utf8");
}