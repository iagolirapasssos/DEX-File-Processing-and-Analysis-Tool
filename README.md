# **DEX File Processing and Analysis Tool**

This project is a web-based tool for processing Android `.dex` files using the **baksmali** library. It allows users to upload `.dex` files, decompile them into `.smali` format, and view the decompiled files directly in the browser.

---

## **Features**
- Upload `.dex` files through a user-friendly interface.
- Decompile `.dex` files into `.smali` files using the **baksmali** tool.
- View the decompiled `.smali` files in the browser with clean formatting.
- Automatically cleans up temporary files after processing.

---

## **Technologies Used**
### **Frontend**
- **HTML5**
- **CSS** (via Bootstrap)
- **JavaScript**

### **Backend**
- **Node.js**
- **Express.js**: For handling file uploads and serving the frontend.
- **Multer**: For file upload management.
- **ShellJS**: To execute the `baksmali` commands.
- **fs**: For file system operations.

### **Tool**
- [baksmali](https://bitbucket.org/JesusFreke/smali/downloads/): Used for decompiling `.dex` files into `.smali` format.

---

## **Getting Started**

### **Prerequisites**
- **Node.js**: Make sure Node.js is installed on your system.
- **Java**: The `baksmali` tool requires Java to be installed.

### **Installation**
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd dex-processing-tool
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Download the `baksmali` tool:
   - Download `baksmali-2.5.2.jar` from the [official page](https://bitbucket.org/JesusFreke/smali/downloads/).
   - Place the `.jar` file in the project root directory.

---

### **Running the Project**
1. Start the server:
   ```bash
   npm start
   ```
2. Open the application in your browser:
   ```
   http://localhost:3000
   ```

---

## **Usage**
1. Upload a `.dex` file through the interface.
2. Click the "Process .dex" button.
3. View the decompiled `.smali` files in the results section.

---

## **Project Structure**

```
dex-processing-tool/
├── public/
│   ├── index.html       # Frontend HTML file
│   ├── script.js        # Frontend JavaScript logic
│   └── style.css        # Optional custom styles
├── uploads/             # Temporary storage for uploaded files and outputs
├── server.js            # Backend logic
├── package.json         # Project configuration and dependencies
├── baksmali-2.5.2.jar   # baksmali tool (must be downloaded manually)
```

---

## **Deployment**

### **Deploying Backend**
To deploy the backend on a cloud service (e.g., Heroku, AWS):
1. Host the backend (`server.js`).
2. Make the `/process-dex` endpoint accessible publicly.

### **Deploying Frontend**
For GitHub Pages:
1. Move the `public/` folder to a separate repository or branch.
2. Configure GitHub Pages to serve the `public/` directory.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## **Contributions**
Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

---

## **Troubleshooting**
- **Java Not Found**: Ensure Java is installed and available in your system's PATH.
- **File Upload Issues**: Confirm the backend is running and accessible at the configured endpoint.
- **Permissions**: Ensure the server has write permissions for the `uploads/` directory.

---

## **Acknowledgments**
- **JesusFreke** for the [baksmali](https://bitbucket.org/JesusFreke/smali/downloads/) tool.
- **Bootstrap** for providing a clean and responsive UI.
