import { Button } from "grommet";
import { Upload } from "grommet-icons";
import React from "react";
import UploadFile from "./UploadFile";

const color = "#fc16de";

export default function FileSection() {
  const handleUpload = (data) => {
    const file = data.target.files[0];
    console.log(file);
  };
  return (
    <div>
      <UploadFile
        style={{ height: "200px" }}
        accept=".jpg,.png"
        onChange={handleUpload}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "default",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Upload color={color} style={{ margin: "12px" }} />
            </div>
            <div style={{ textAlign: "center", color: color }}>
              Suelte los archivos aquí para subirlos de inmediato
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                style={{ color: color }}
                margin="small"
                secondary
                label="Grabar Video"
                onClick={() => {
                  console.log("Click Button");
                }}
              />
              <Button
                style={{ color: color }}
                secondary
                margin="small"
                label="Subir desde la galeria"
                onClick={() => {
                  console.log("Click Button");
                }}
              />
            </div>
          </div>
        </div>
      </UploadFile>
    </div>
  );
}
