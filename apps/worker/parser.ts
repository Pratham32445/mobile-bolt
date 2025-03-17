export class ArtifactParser {
    currentArtifact: string;
    onFileUpdate: (filePath: string, fileArtifact: string) => void;
    onShellUpdate: (cmd: string) => void;

    constructor(onFileUpdate: (filePath: string, fileArtifact: string) => void, onShellUpdate: (cmd: string) => void) {
        this.currentArtifact = "";
        this.onFileUpdate = onFileUpdate;
        this.onShellUpdate = onShellUpdate;
    }

    addArtifact(artifact: string) {
        this.currentArtifact += artifact;
    }
    parser() {
        const lines = this.currentArtifact.split("\n");
        const startIdx = lines.findIndex((line) => line.includes("<boltAction type="));
        if (startIdx != -1) {
            const endIdx = lines.findIndex((line, index) => index > startIdx && line.includes("</boltAction>"));
            if (endIdx != -1) {
                const content = lines.slice(startIdx + 1, endIdx).join("\n");
                const type = lines[startIdx].match(/type="([^"]+)"/);
                const filePath = lines[startIdx].match(/filePath="([^"]+)"/);
                if (type && type[1] == "file" && filePath) {
                    this.onFileUpdate(filePath[1], content);
                }
                else if (type && type[1] == "shell") {
                    this.onShellUpdate(content)
                }
                this.currentArtifact = [
                    ...lines.slice(0, startIdx),
                    ...lines.slice(endIdx + 1)
                ].join("\n");
            }
        }
    }
    isRemaining() {
        return this.currentArtifact.split("\n").findIndex(line => line.includes("<boltAction type="))
    }
}
