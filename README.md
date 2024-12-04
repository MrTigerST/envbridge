# EnvBuilder

![EnvBuilder Logo](https://via.placeholder.com/600x200.png?text=EnvBuilder)

**EnvBuilder** is a tool created by **MrTigerST** to securely and automatically generate `.env` files from an `envinfo.json` file. With integrity verification, it ensures the accuracy and safety of your environment variables by preventing unauthorized modifications.

---

## 🚀 Key Features
- **Automatic `.env` file generation**: Converts the data from `envinfo.json` into a ready-to-use `.env` file.
- **Integrity verification**: Checks that the `envinfo.json` file hasn't been tampered with, ensuring security and reliability.
- **Easy customization**: Simply add your environment variables and descriptions to the JSON file for easy management.

---

## 📦 Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/MrTigerST/envbuilder.git
    cd envbuilder
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Prepare the `envinfo.json` file**:
   Create an `envinfo.json` file in the root directory following this example:
   ```json
   {
       "integrity": "insert_your_integrity_hash_here",
       "dataenv": [
           {
               "name": "TOKEN",
               "description": "Your bot token",
               "defaultValue": "ciao"
           },
           {
               "name": "TOKEN2",
               "description": "Another bot token",
               "defaultValue": ""
           }
       ]
   }
