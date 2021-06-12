export const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
};

export const activeStyle = {
    borderColor: '#2196f3',
};

export const acceptStyle = {
    borderColor: '#00e676',
};

export const rejectStyle = {
    borderColor: '#ff1744',
};

export const CANCELLED_BY_USER = 'CANCELLED_BY_USER';

export const state = {
    INIT: 'INIT',
    LOADED: 'LOADED',
    UPLOADING: 'UPLOADING',
    UPLOADED: 'UPLOADED',
    ERROR_UPLOADING: 'ERROR_UPLOADING',
    COMPLETED: 'COMPLETED',
    RECORDING: 'RECORDING',
};
