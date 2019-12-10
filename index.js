const fs = require("fs");
const ui = require("ui");
const input = require("input");
const bundler = require("./bundler");

async function main() {

  // package name
  const name = await input.text({
    placeholder: "package name",
    type: 1
  });

  if (name == null || name.length == 0) {
    return;
  }

  const modulePath = `node_modules/${name}`;
  if (!fs.existsSync(modulePath)) {
    ui.toast(`'${name}' not found.`);
    return;
  }

  // entry file
  const entry = await input.text({
    placeholder: "entry file",
    text: "index.js",
    type: 1
  });

  if (entry == null || entry.length == 0) {
    return;
  }

  const entryPath = `${modulePath}/${entry}`;
  if (!fs.existsSync(entryPath)) {
    ui.toast(`'${entry}' not found.`);
  }

  const outfile = await input.text({
    placeholder: "output file name",
    text: "bundle",
    type: 1
  });

  if (outfile == null || outfile.length == 0) {
    return;
  }

  // start
  console.log(`browserify: ${name}`);
  bundler.bundle(entryPath, outfile);
}

main();