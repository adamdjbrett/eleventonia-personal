const { DateTime } = require("luxon");
const dateFilter = require("./src/filters/dateFilter.js");
const cleanCSS = require("clean-css");

module.exports = function (config) {
  config.setServerOptions({
    // Whether the live reload snippet is used
    liveReload: true,
    port: 3456,
    watch: ["dist/**/*.css"],
    showAllHosts: true,
  });
  // PASSTHROUGHS
  config.addPassthroughCopy("src/assets/images/");

  // LAYOUTS //
  config.addLayoutAlias("base", "layouts/base.njk");
  config.addLayoutAlias("post", "layouts/post.njk");

  // FILTERS //
  // date filter
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("dateToRfc3339", function (value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return DateTime.fromJSDate(date, { zone: "utc" }).toISO({ suppressMilliseconds: true });
  });
  // clean and inline CSS
  config.addFilter("cssmin", function (code) {
    return new cleanCSS({}).minify(code).styles;
  });

  // EXTRAS //
  // Post List Excerpts
  config.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  // BASE CONFIGURATION //
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "includes",
      data: "data",
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
