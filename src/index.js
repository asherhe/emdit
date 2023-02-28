import React from "react";
import ReactDOM from "react-dom/client";

import { drawSelection, EditorView, gutters, highlightActiveLine, keymap, lineNumbers } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { syntaxHighlighting } from "@codemirror/language";

import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "./fonts.css";

import theme from "./theme";
import mdHighlighting from "./highlighting";

import { save, open } from "./files";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.element = React.createRef();
    this.state = {
      doc: "",
      docName: "untitled.md",
      modified: false,
    };

    /** @type {EditorView} */
    this.view = null;

    window.addEventListener("beforeunload", (e) => {
      if (this.state.modified) e.returnValue = "Are you sure you want to exit?";
    });
  }

  updateState(newState) {
    let state = this.state;
    for (let key in newState) state[key] = newState[key];
    this.setState(state);
  }

  render() {
    this.setTitle();
    return <div className="app" ref={this.element} />;
  }

  setTitle() {
    document.title = `${this.state.modified ? "*" : ""}${this.state.docName} - eMDit`;
  }

  componentDidMount() {
    const startState = EditorState.create({
      doc: this.state.doc,
      extensions: [
        keymap.of([
          {
            key: "Mod-s",
            run: save(this),
            preventDefault: true,
          },
          {
            key: "Mod-o",
            run: open(this),
            preventDefault: true,
          },
        ]),

        markdown({
          base: markdownLanguage,
        }),
        syntaxHighlighting(mdHighlighting),

        EditorView.lineWrapping,
        EditorState.tabSize.of(2),
        lineNumbers(),
        gutters(),

        highlightActiveLine(),
        drawSelection(),
        theme,

        history(),
        keymap.of(historyKeymap),

        keymap.of(defaultKeymap),

        EditorView.updateListener.of((update) => {
          if (update.docChanged && this.state.doc !== update.state.doc.toString())
            this.updateState({ doc: update.state.doc.toString(), modified: true });
        }),
      ],
    });

    this.view = new EditorView({
      state: startState,
      parent: this.element.current,
    });
    this.view.focus();
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
