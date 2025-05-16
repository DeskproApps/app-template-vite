const fs = require("fs");

function bumpSemanticVersion(versionString, labels) {
  let [major, minor, patch] = (versionString ?? '0.0.0').split(".");

  if (labels?.includes("major")) {
    major = parseInt(major) + 1;
    minor = 0;
    patch = 0;
  } else if (labels?.includes("minor")) {
    minor = parseInt(minor) + 1;
    patch = 0;
  } else {
    patch = parseInt(patch) + 1;
  }

  return `${major}.${minor}.${patch}`;
};

const packageJson = JSON.parse(fs.readFileSync("./manifest.json", "utf8"));

packageJson.version = bumpSemanticVersion(
  process.argv[3],
  process.argv[2],
);

fs.writeFileSync("./manifest.json", JSON.stringify(packageJson, null, 2));
console.log(packageJson.version);
