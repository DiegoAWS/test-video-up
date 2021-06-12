/* eslint-disable no-nested-ternary */
import { Box, Meter } from 'grommet';
import { Close, StatusGood } from 'grommet-icons';
import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { CloseButton, PlayerWrapper, StyledButton, VideoFilter } from './styledComponents';
import { state, CANCELLED_BY_USER } from '../helpers/constants';
import { cancelAxiosRequest } from '../helpers';

export default function VideoPlayer({ urlVideo, uploadProgress, status, cancel, uploadVideo }) {
    const cancelUpload = () => {
        cancelAxiosRequest(CANCELLED_BY_USER);
    };

    return (
        <div style={{ width: '400px', margin: '0 auto' }}>
            <PlayerWrapper>
                {status === state.LOADED && (
                    <CloseButton onClick={cancel}>
                        <Close color="brand" />
                    </CloseButton>
                )}
                <ReactPlayer
                    url={urlVideo}
                    controls
                    playsinline
                    className="videoPlayer"
                    width="100%"
                    height="100%"
                />
                {status === state.UPLOADING && (
                    <VideoFilter>
                        <Meter
                            style={{ width: '40px', height: '40px' }}
                            values={[
                                {
                                    value: uploadProgress,
                                    label: 'sixty',
                                },
                            ]}
                            aria-label="meter"
                            type="circle"
                        />
                        <div>Subiendo video solicitado</div>
                    </VideoFilter>
                )}
                {status === state.UPLOADED && (
                    <VideoFilter style={{ zIndex: '3' }}>
                        <StatusGood color="brand" size="large" />
                        <div>Enviado video solicitado</div>
                    </VideoFilter>
                )}
            </PlayerWrapper>
            <Box direction="row" align="center" justify="center">
                <StyledButton
                    style={{
                        width: '100%',
                        marginTop: '20px',
                    }}
                    color={status === state.ERROR_UPLOADING ? 'red' : 'brand'}
                    secondary
                    disabled={status === state.ERROR_UPLOADING}
                    label={
                        status === state.LOADED
                            ? 'Enviar video'
                            : status === state.UPLOADING
                            ? 'Cancelar'
                            : status === state.ERROR_UPLOADING
                            ? 'Error al subir Video'
                            : 'Subir Nuevo Video'
                    }
                    onClick={() => {
                        if (status === state.LOADED) {
                            uploadVideo();
                        } else if (status === state.UPLOADING) {
                            cancelUpload();
                        } else {
                            cancel();
                        }
                    }}
                />
            </Box>
        </div>
    );
}
VideoPlayer.propTypes = {
    urlVideo: PropTypes.string,
    uploadProgress: PropTypes.number,
    status: PropTypes.oneOf(Object.keys(state)),
    cancel: PropTypes.func,
    uploadVideo: PropTypes.func,
};

VideoPlayer.defaultProps = {
    urlVideo: '',
    uploadProgress: 0,
    status: state.INIT,
    cancel: () => {},
    uploadVideo: () => {},
};
