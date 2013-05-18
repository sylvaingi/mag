Package.describe({
  summary: "MAG deps"
});

Npm.depends({
    "imagemagick": "0.1.3",
    "glob": "3.1.21"
});

Package.on_use(function (api) {
  api.add_files("mag.js", "server");
});