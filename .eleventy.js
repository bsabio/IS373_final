const htmlMinifier = require("html-minifier-terser");

module.exports = function (eleventyConfig) {
  // Passthrough copy for assets folder
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Global site data (used in templates)
  if (eleventyConfig.addGlobalData) {
    eleventyConfig.addGlobalData("site", {
      title: "MyWebClass.org",
      description: "A learning site for Web Class",
      baseUrl: process.env.BASEURL || "."
    });
  }

  // Minify HTML in production
  if (process.env.ELEVENTY_ENV === "production") {
    eleventyConfig.addTransform("htmlmin", async function (content, outputPath) {
      if (outputPath && outputPath.endsWith('.html')) {
        try {
          return await htmlMinifier.minify(content, {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
            keepClosingSlash: true
          });
        } catch (e) {
          console.warn('HTML minify failed:', e);
          return content;
        }
      }
      return content;
    });
  }

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "layouts",
      output: "_site"
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    pathPrefix: process.env.PATH_PREFIX || ""
  };
};
