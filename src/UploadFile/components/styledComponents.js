import { Button } from 'grommet';
import styled from 'styled-components';

export const PlayerWrapper = styled.div`
    position: relative;
    padding-top: ${(props) => (props.noPadding ? '0px' : '56.25%')};
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
