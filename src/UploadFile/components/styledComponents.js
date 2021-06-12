import { Button } from "grommet";
import styled from "styled-components";
import { celebrity } from "../../theme";

const colorBrand = celebrity.global.colors.brand;

export const PlayerWrapper = styled.div`
  position: relative;
  padding-top: ${(props) => (props.noPadding ? "0px" : "56.25%")};
  .videoPlayer,
  .videoRecorder {
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
  margin: 1rem;
  color: ${colorBrand};
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 2;
`;

export const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 12px;
`;

export const StyledButton = styled(Button)`
  background: #fcfcfc;
  border: 1px solid #d4d4d4;
  color: #ff0fe4;
  margin: 12px;
  :hover {
    box-shadow: none;
    border: 2px solid #ff0fe4;
    margin: 11px;
  }
`;

export const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="75.402"
    height="65.817"
    viewBox="0 0 75.402 65.817"
  >
    <g id="Capa_x0020_1" transform="translate(-0.041 -0.059)">
      <path
        d="M71.244,61.677h-67v-21.3H.041v25.5h75.4v-25.5h-4.2v21.3ZM18.81,29.58,37.742,52.3,56.674,29.58l-3.226-2.688L39.841,43.219V.059h-4.2V43.219L22.035,26.891,18.81,29.58Z"
        transform="translate(0 0)"
        fill="#ff0fe4"
        fillRule="evenodd"
      />
    </g>
  </svg>
);
