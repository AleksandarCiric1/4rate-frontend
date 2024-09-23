import React from "react";

interface DataLoaderProps {
  size?: number; // Size of the spinner (default is 40)
  color?: string; // Color of the spinner (default is '#3498db')
}

const DataLoader: React.FC<DataLoaderProps> = ({
  size = 40,
  color = "#3498db",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          border: `${size / 8}px solid ${color}`,
          borderTop: `${size / 8}px solid transparent`,
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DataLoader;
