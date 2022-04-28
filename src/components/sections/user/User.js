import React, { useContext } from "react";
import SearchKey from "./SearchKey";
import Container from "@material-ui/core/Container";

const User = () => {
  return (
    <>
      <Container maxWidth="xl">
        <SearchKey></SearchKey>
      </Container>
    </>
  );
};

export default User;
