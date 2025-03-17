import { onFileUpdate, onShellUpdate } from "./os";
import { ArtifactParser } from "./parser";
import { testArtifact } from "./testArtifact";

const artifact = new ArtifactParser(onFileUpdate,onShellUpdate);

artifact.addArtifact(testArtifact);
artifact.parser();