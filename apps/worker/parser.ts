export class ArtifactParser {
    currentArtifact : string;
    constructor() {
        this.currentArtifact = "";
    }
    addArtifact(artifact : string) {
        this.currentArtifact += artifact;
    }
    parse() {
        
    }
}