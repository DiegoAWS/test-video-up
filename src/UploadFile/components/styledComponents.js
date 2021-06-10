import { Button } from "grommet";
import styled from "styled-components";

export const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  .videoPlayer {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const VideoFilter = styled.div`
  z-index: 23;
  position: absolute;
  background: #a2ddff59;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fc16de;
`;

export const CloseButton = styled(Button)`
  background: transparent;
  margin: 0;
  color: red;
  position: absolute;
  top: 0px;
  right: 0px;
  zindex: 2;
`;
