import fs from "fs";
import path from "path";

function baseDirPath(type: "REACT_NATIVE" | "NEXT_JS" | "REACT") {
    return `/project/${type}`
}

export function onFileUpdate(filePath: string, fileArtifact: string) {
    const fullPath = path.join(__dirname, baseDirPath("REACT_NATIVE"), filePath);
    const dirPath = path.dirname(fullPath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    if (!fs.existsSync(fullPath)) {
        fs.writeFile(fullPath, fileArtifact, (err) => {
            if (err) {
                console.log(err);
                return;
            }
        })
    }
    else {
        console.log(filePath, fileArtifact);
        fs.appendFile(filePath, fileArtifact, "utf-8", (err) => {
            if (err) {
                console.log(err);
                return;
            }
        });
    }
}

export function onShellUpdate(cmd: string) {
    console.log(cmd);
}