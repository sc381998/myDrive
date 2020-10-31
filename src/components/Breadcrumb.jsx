import React from "react";
import { Breadcrumbs } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorTwoToneIcon from "@material-ui/icons/BorderColorTwoTone";

export default function Breadcrumb(props) {
  const { breadCrumbNameArr, onFolderClick } = props;
  function handleClick() {
    return;
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadCrumbNameArr.map((ele, index) => (
            <div
              className="breadcrumb c-p"
              key={index}
              onClick={() => onFolderClick(ele)}
            >
              {ele}
            </div>
          ))}
        </Breadcrumbs>
      </Box>
    </>
  );
}
