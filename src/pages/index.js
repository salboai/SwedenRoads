import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Karta from "../components/Karta";

export default function Index() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Sveriges vägar
      </Typography>
      <Karta />
    </Container>
  );
}
