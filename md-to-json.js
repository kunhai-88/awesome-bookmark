const { writeFileSync, readFileSync } = require("fs");
const { join } = require("path");
const Markdown = require("@dimerapp/markdown");
const { prop, groupBy, map, flow, drop, first, last } = require("lodash/fp");
const content = readFileSync(join(__dirname, "./README.md"));

const mapIndexed = map.convert({ cap: false });

const md = new Markdown(content);

const transform = data => {
  let index = null;
  const res = flow(
    prop("children"),
    groupBy(({ tag, children }) => {
      if (tag === "h2") {
        index = flow(
          last,
          prop("value")
        )(children);
        return index;
      }
      if (tag === "p") {
        return index;
      }
    }),
    mapIndexed((v, i) => ({
      title: i,
      children: flow(
        drop(1),
        map(item => ({
          title: flow(
            prop("children"),
            first,
            prop("children"),
            first,
            prop("value")
          )(item),
          link: flow(
            prop("children"),
            first,
            prop("props.href"),
          )(item)
        }))
      )(v)
    }))
  )(data);
  return res;
};

// or toJSON
md.toJSON().then(res => {
  writeFileSync(
    join(__dirname, "./src/config.json"),
    JSON.stringify(transform(res.contents), null, 2)
  );
});
