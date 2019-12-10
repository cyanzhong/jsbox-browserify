exports.bundle = (path, name) => {
  const fs = require("fs");
  const browserify = require("browserify");
  const options = {"standalone": name};

  if (!fs.existsSync("dist")) {
    fs.mkdirSync("dist");
  }

  browserify(path, options)
  .on("transform", (tr, file) => {
    console.log(`transform: ${file}`);
  })
  .bundle()
  .pipe(fs.createWriteStream(`dist/${name}.js`));
}