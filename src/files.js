export function save(component) {
  return (view) => {
    let a = document.createElement("a");
    a.download = component.state.docName;
    a.href = window.URL.createObjectURL(new Blob([component.state.doc], { type: "text/markdown" }));
    a.click();
    a.remove();
    component.updateState({ modified: false });
  };
}

export function open(component) {
  return (view) => {
    let fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (e) => {
      let file = e.target.files[0];
      if (!file) return;
      let reader = new FileReader();
      reader.onload = function (e) {
        component.updateState({ doc: e.target.result, docName: file.name, modified: false });
        view.dispatch({
          changes: {
            from: 0,
            to: view.state.doc.length,
            insert: e.target.result,
          },
        });
        fileInput.remove();
      };
      reader.readAsText(file);
    };
    fileInput.click();
  };
}
