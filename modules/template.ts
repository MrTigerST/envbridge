const path = require('path');
const fs = require('fs');
const rd = require('readline');

export function createTemplate() {


    const envInfoPath = path.join(process.cwd(), "envinfo.json");


    function templateCreationLogic() {
        const templateContent = `{
            "dataenv": [
                {
                    "name": "TOKEN",
                    "description": "Your token 1",
                    "defaultValue": "hello"
                },
                {
                    "name": "TOKEN2",
                    "description": "Your token 2",
                    "defaultValue": ""
                },
                {
                    "name": "TOKEN3",
                    "description": "Your token 3",
                    "defaultValue": ""
                }
            ]
        }`;

        fs.writeFileSync(envInfoPath, templateContent);
        console.log("Template envinfo.json file has been created.");
    }


    if (fs.existsSync(envInfoPath)) {

        const rl = rd.createInterface({ input: process.stdin, output: process.stdout });

        rl.question("The envinfo.json file already exists in your workspace. Are you sure you want to overwrite it with a Template envinfo.json file ? (y/n) ", (answer: String) => {
            if (answer.toLowerCase().trim() === "y") {
                templateCreationLogic();
            } else {
                console.log("Template envinfo.json file creation canceled.");
            }
            rl.close();
        })
    } else {
        templateCreationLogic();
    }
}