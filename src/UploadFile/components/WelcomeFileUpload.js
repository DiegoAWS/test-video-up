import { Text } from "grommet";
import React, { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { isFirstFileValid, styleOfDragZone } from "../helpers";
import { StyledButton, TextWrapper, UploadIcon } from "./styledComponents";

export default function WelcomeFileUpload({
  onChange = () => {},
  onClickRecordVideo = () => {},
}) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    open,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "video/*",
    noClick: true, // Disable Open selection File window on Clik
    multiple: false,
    maxSize: "50000000", //Set max limit file to 50MB
  });

  // Every time there is a new valid file arriving
  useEffect(() => {
    if (isFirstFileValid(acceptedFiles)) {
      const file = acceptedFiles[0];
      onChange(file);
    }
  }, [acceptedFiles, onChange]);

  /**
   * Style of DragDrop Zone based on File Draged inside
   */

  const styleDragAndDrop = useMemo(
    () => styleOfDragZone({ isDragActive, isDragReject, isDragAccept }),

    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div>
      <div {...getRootProps()} style={styleDragAndDrop}>
        <input {...getInputProps()} />
        <TextWrapper>
          <UploadIcon />
        </TextWrapper>
        <TextWrapper>
          <Text color="brand">
            Suelte los archivos aquí para subirlos de inmediato
          </Text>
        </TextWrapper>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <StyledButton
            secondary
            label="Grabar Video"
            onClick={onClickRecordVideo}
          />
          <StyledButton
            secondary
            label="Subir desde la galeria"
            onClick={open}
          />
        </div>
      </div>
    </div>
  );
}
