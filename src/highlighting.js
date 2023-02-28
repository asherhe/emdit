import { HighlightStyle } from "@codemirror/language";
import { tags } from "@lezer/highlight";
import colors from "./colors";

const mdHighlighting = HighlightStyle.define([
  {
    tag: tags.heading,
    fontWeight: "800",
    color: colors.tertiary,
  },
  {
    tag: tags.strong,
    fontWeight: "bold",
    color: colors.primary,
  },
  {
    tag: tags.emphasis,
    fontStyle: "italic",
    color: colors.secondary,
  },
  {
    tag: tags.link,
    color: colors.tertiary,
  },
  {
    tag: tags.monospace, // code blocks
    color: colors.secondary,
  },
  {
    tag: tags.quote,
    color: colors.gray,
    fontStyle: "italic",
  },
]);

export default mdHighlighting;
