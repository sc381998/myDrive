import React, { useState } from "react";
import "./styles.css";
import data from "./data/data";
import DialogBox from "./components/DialogBox";
import Header from "./components/Header";
import Breadcrumb from "./components/Breadcrumb";
import Files from "./components/Files";
import Folders from "./components/Folders";
import Footer from "./components/Footer";

export default function App() {
  const [openFile, setOpenFile] = React.useState(false);
  const handleOpenNewFile = () => setOpenFile(true);
  const handleCloseFile = () => setOpenFile(false);

  const [openFolder, setOpenFolder] = React.useState(false);
  const handleOpenNewFolder = () => setOpenFolder(true);
  const handleCloseFolder = () => setOpenFolder(false);

  let currentIndex = 0;
  const [dataName, setDataName] = useState(data[currentIndex].name);
  const [dataContents, setDataContents] = useState(data[currentIndex].contents);

  let [breadCrumbNameArr, setBreadCrumbName] = useState(dataName.split("/"));

  function handleRenameFolder() {}

  function handleRenameFile() {}

  function addNode(newNode) {
    const obj = handleData(
      data[0],
      breadCrumbNameArr[breadCrumbNameArr.length - 1]
    );
    obj.contents.push(newNode);
    handleFolderClick(obj.name);
  }

  function handleFolderDelete(currentName) {
    const obj = handleData(
      data[0],
      breadCrumbNameArr[breadCrumbNameArr.length - 1]
    );
    let i = 0;
    for (i = 0; i < obj.contents.length; i++) {
      if (obj.contents[i].name === currentName) {
        obj.contents[i].status = false;
        break;
      }
    }
    handleFolderClick(obj.name);
  }

  function handleFileDelete(currentName) {
    const obj = handleData(
      data[0],
      breadCrumbNameArr[breadCrumbNameArr.length - 1]
    );
    let i = 0;
    for (i = 0; i < obj.contents.length; i++) {
      if (obj.contents[i].name === currentName) {
        obj.contents[i].status = false;
        break;
      }
    }
    handleFolderClick(obj.name);
  }

  function handleFolderClick(currentName) {
    let flag = false;
    let i = 0;
    for (i = 0; i < breadCrumbNameArr.length; i++) {
      if (breadCrumbNameArr[i] === currentName) {
        flag = true;
        break;
      }
    }
    let arr = [];
    if (flag) {
      for (let j = 0; j <= i; j++) {
        arr.push(breadCrumbNameArr[j]);
      }
    } else {
      arr = [...breadCrumbNameArr];
      arr.push(currentName);
    }
    setBreadCrumbName(arr);
    setDataName((preName) => preName + "/" + currentName);
    const obj = handleData(data[0], currentName);
    if (obj.contents) setDataContents(obj.contents);
  }

  function handleData(obj, currentName) {
    if (obj.name === currentName) {
      return obj;
    }
    if (obj.hasOwnProperty("contents")) {
      for (let i = 0; i < obj.contents.length; i++) {
        var foundName = handleData(obj.contents[i], currentName);
        if (foundName && foundName.name === currentName) {
          return foundName;
        }
      }
    }
    return null;
  }
  return (
    <>
      <Header />
      <div className="container">
        <Breadcrumb
          breadCrumbNameArr={breadCrumbNameArr}
          onFolderClick={handleFolderClick}
        />

        <hr />

        <Folders
          handleOpenNewFolder={handleOpenNewFolder}
          handleFolderDelete={handleFolderDelete}
          handleFolderClick={handleFolderClick}
          handleRenameFolder={handleRenameFolder}
          dataContents={dataContents}
        />

        <Files
          handleOpenNewFile={handleOpenNewFile}
          handleFileDelete={handleFileDelete}
          handleRenameFile={handleRenameFile}
          dataContents={dataContents}
        />
      </div>
      <Footer />
      <DialogBox
        addNode={addNode}
        open={openFile}
        handleClose={handleCloseFile}
        type="file"
      />
      <DialogBox
        addNode={addNode}
        open={openFolder}
        handleClose={handleCloseFolder}
        type="folder"
      />
    </>
  );
}
