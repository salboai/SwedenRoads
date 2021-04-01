import React from "react";
import { Box } from "@material-ui/core";
import Imgbox from "./Imgbox";
import Table from "./Table";
import "./Roadinfo.css";

export default function Roadinfo(props) {
  //road.id
  return (
    <Box
      className={props.road.isopen ? "fadeIn" : "fadeOut"}
      position="absolute"
      bgcolor="#fff"
      width={410}
      maxWidth="100%"
      height="100vh"
      boxShadow={5}
    >
      {props.road.isopen && (
        <>
          <Imgbox features={props.features} road={props.road} />
          <Table p={props.road.properties} />
        </>
      )}
    </Box>
  );
}
