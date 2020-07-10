import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "../components/Link";

export default function Notfound() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Not found.
        </Typography>
        <Link to="/">Go to the main page</Link>
      </Box>
    </Container>
  );
}
