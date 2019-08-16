import React from "react";
import DrawingBoard from "./components/DrawingBoard";
import styled from "styled-components";

const AppWrapper = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <AppWrapper>
      <DrawingBoard />
    </AppWrapper>
  );
}

export default App;
