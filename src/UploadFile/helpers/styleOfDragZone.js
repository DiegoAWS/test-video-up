import { acceptStyle, activeStyle, baseStyle, rejectStyle } from './constants';

/**
 * Style of DragDrop Zone based on File Draged inside
 */
const styleOfDragZone = ({ isDragActive, isDragAccept, isDragReject }) => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
});
export default styleOfDragZone;
