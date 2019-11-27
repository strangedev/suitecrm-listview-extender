const Mustache = require("mustache");
const _glob = require("glob");
const fs = require("fs").promises;
const path = require("path");

async function glob(ptrn) {
  return new Promise((resolve, reject) => {
    _glob(ptrn, function(err, files) {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

async function getTemplates() {
  return (await glob("plugin/**/*.mustache")).map(f => f.substr(7));
}

async function renderTemplates(jsonFile) {
  const view = require(jsonFile);
  const files = await getTemplates();
  for (const f of files) {
    const template = await fs.readFile(`plugin/${f}`, "utf8");
    const name = path.basename(f, ".mustache");
    console.info(`Rendering template ${f} -> ${name}`);
    await fs.writeFile(`build/sdist/${name}`, Mustache.render(template, view));
  }
}

renderTemplates(process.argv[2])
  .then(() => {})
  .catch(console.error);
