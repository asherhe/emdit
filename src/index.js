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
      doc: '# heading 1\n## heading 2\n### heading 3\n#### heading 4\n##### heading 5\n###### heading 6\n\n**bold** *italic* `code` [link](https://github.com/)\n\n```python\nprint("hello, world!")\n```\n\n- apples\n- bananas\n- oranges\n\n1. one\n2. two\n3. three\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Turpis egestas sed tempus urna et pharetra pharetra massa massa. Tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. Tellus orci ac auctor augue mauris augue neque gravida in. Quis vel eros donec ac odio tempor orci. Sed arcu non odio euismod lacinia at quis risus sed. Metus aliquam eleifend mi in nulla posuere sollicitudin. Adipiscing enim eu turpis egestas pretium aenean pharetra. Et malesuada fames ac turpis egestas maecenas. Elementum eu facilisis sed odio morbi. Fames ac turpis egestas integer eget aliquet nibh. Eget aliquet nibh praesent tristique. Massa id neque aliquam vestibulum morbi. Sit amet aliquam id diam. Nulla aliquet enim tortor at auctor urna nunc. Viverra adipiscing at in tellus integer. Venenatis lectus magna fringilla urna.\n\n> Volutpat commodo sed egestas egestas fringilla phasellus faucibus. Bibendum at varius vel pharetra. Eget nulla facilisi etiam dignissim diam quis enim lobortis. Sagittis id consectetur purus ut faucibus. Nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Eget mi proin sed libero enim sed. Non tellus orci ac auctor augue mauris augue. Vulputate mi sit amet mauris commodo quis. Elementum tempus egestas sed sed risus pretium quam. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Tempus egestas sed sed risus pretium quam. Cursus turpis massa tincidunt dui ut. Nulla facilisi etiam dignissim diam. Arcu risus quis varius quam quisque id diam vel quam.\n',
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
