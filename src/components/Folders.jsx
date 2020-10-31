import React from "react";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";

export default function Files(props) {
  const {
    handleOpenNewFolder,
    handleFolderDelete,
    dataContents,
    handleFolderClick
  } = props;
  return (
    <>
      <Typography className="mt-10 label" variant="h6" component="h6">
        Folder
      </Typography>
      <Box display="flex">
        {dataContents
          .filter((ele) => {
            return ele.type === "folder";
          })
          .map((ele, index) => {
            return (
              ele.status && (
                <div key={index} className="node">
                  <h1
                    className="c-p center h1Hover"
                    onClick={() => handleFolderClick(ele.name)}
                  >
                    {ele.name}
                  </h1>
                  <Typography component="div" variant="body1">
                    {/* <BorderColorTwoToneIcon
                      className="m-5 hoverEffect"
                      onClick={handleOpenNewFolder}
                    /> */}
                    <DeleteIcon
                      className="m-5 hoverEffect"
                      onClick={() => handleFolderDelete(ele.name)}
                    />
                  </Typography>
                </div>
              )
            );
          })}

        <Button
          onClick={handleOpenNewFolder}
          className="m-5 newCustomStyle"
          variant="outlined"
          color="primary"
          name="Files"
        >
          New
        </Button>
      </Box>
    </>
  );
}
