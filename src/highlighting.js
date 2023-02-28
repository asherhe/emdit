import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";

const primary = "#ee6c4f",
  secondary = "#f1d55c",
  tertiary = "#71a6e5",
  gray = "#93a0ab";

const mdHighlighting = HighlightStyle.define([
  {
    tag: tags.heading,
    fontWeight: "800",
    color: tertiary,
  },
  {
    tag: tags.strong,
    fontWeight: "bold",
    color: primary,
  },
  {
    tag: tags.emphasis,
    fontStyle: "italic",
    color: secondary,
  },
  {
    tag: tags.link,
    color: tertiary,
  },
  {
    tag: tags.monospace, // code blocks
    color: secondary,
  },
  {
    tag: tags.quote,
    color: gray,
    fontStyle: "italic",
  },
]);

export default mdHighlighting;
