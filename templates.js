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

async function getTemplates(multi = false) {
  let ptrn = "plugin/**/*.mustache";
  if (multi) ptrn += ".multi";
  return (await glob(ptrn)).map(f => f.substr(7));
}

async function renderTemplates(jsonFile, multiRoot, multiKey) {
  const view = require(jsonFile);
  const files = await getTemplates();
  for (const f of files) {
    const template = await fs.readFile(`plugin/${f}`, "utf8");
    const name = path.basename(f, ".mustache");
    console.info(`Rendering template ${f} -> ${name}`);
    await fs.writeFile(`build/sdist/${name}`, Mustache.render(template, view));
  }
  const multis = await getTemplates(true);
  for (const viewRoot of view[multiRoot]) {
    for (const f of multis) {
      const template = await fs.readFile(`plugin/${f}`, "utf8");
      const name = `${path.basename(f, ".mustache.multi")}.${
        viewRoot[multiKey]
      }`;
      console.info(`Rendering template ${f} -> ${name}`);
      const tmpView = {};
      tmpView[multiKey] = viewRoot[multiKey];

      await fs.writeFile(
        `build/sdist/${name}`,
        Mustache.render(template, tmpView)
      );
    }
  }
}

renderTemplates(process.argv[2], process.argv[3], process.argv[4])
  .then(() => {})
  .catch(console.error);
