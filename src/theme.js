import { EditorView } from "codemirror";
import colors from "./colors";

export default EditorView.theme(
  {
    "&": {
      color: colors.fg,
      backgroundColor: colors.bg,
    },
    ".cm-gutters": {
      padding: "0 15px",
      backgroundColor: "transparent",
      borderRightWidth: "2px",
      borderRightStyle: "solid",
      borderRightColor: colors.activeOutline,
    },

    ".cm-cursor": {
      borderLeftWidth: "2px",
      borderLeftColor: colors.fg,
    },
    "&.cm-focused .cm-selectionBackground, .cm-content::selection": {
      backgroundColor: colors.activeBg,
    },

    ".cm-line": {
      borderTopWidth: "2px",
      borderTopStyle: "solid",
      borderTopColor: "transparent",
      borderBottomWidth: "2px",
      borderBottomStyle: "solid",
      borderBottomColor: "transparent",
    },
    ".cm-activeLine": {
      backgroundColor: colors.activeBg,
      borderTopColor: colors.activeOutline,
      borderBottomColor: colors.activeOutline,
    },
  },
  { dark: true }
);
