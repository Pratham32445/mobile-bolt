export class ArtifactParser {
    currentArtifact: string;
    currentType: "file" | "shell" | "";
    currentFilePath: string;
    currentFileContent: string;

    constructor() {
        this.currentArtifact = "";
        this.currentType = "";
        this.currentFilePath = "";
        this.currentFileContent = "";
    }

    addText(text: string) {
        this.currentArtifact += text;
    }

    parse() {
        const lines = this.currentArtifact.split("\n");

        const startIdx = lines.findIndex((line) => line.trim().startsWith("<boltAction type="));
        if (startIdx !== -1) {
            const lastIdx = lines.findIndex((line, idx) => idx > startIdx && line.trim().startsWith("</boltAction>"));

            if (lastIdx !== -1) {
                const actionLine = lines[startIdx].trim();

                const filePathMatch = actionLine.match(/filePath="([^"]+)"/);
                const typeMatch = actionLine.match(/type="([^"]+)"/);

                this.currentFilePath = filePathMatch ? filePathMatch[1] : "";
                this.currentType = typeMatch ? (typeMatch[1] as "file" | "shell") : "";

                this.currentFileContent = lines.slice(startIdx, lastIdx + 1).join("\n");

                this.currentArtifact = lines.slice(lastIdx + 1).join("\n");
            }
        }
    }
    
}