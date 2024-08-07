// src/components/App.js
import React, { useState } from "react";
import axios from "axios";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function App() {
  const [file, setFile] = useState(null);
  const [algorithm, setAlgorithm] = useState("kmeans");
  const [originalData, setOriginalData] = useState([]);
  const [clusteredData, setClusteredData] = useState([]);
  const [clusters, setClusters] = useState([]);

  const handleGenerateData = async (type) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/generate_data?type=${type}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${type}_data.csv`);
      document.body.appendChild(link);
      link.click();

      const text = await response.data.text();
      const parsedData = text
        .split("\n")
        .slice(1)
        .map((row) => {
          const [x, y] = row.split(",");
          return { x: parseFloat(x), y: parseFloat(y) };
        });
      setOriginalData(parsedData);
    } catch (error) {
      console.error("Error generating dataset:", error);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleClusterData = async () => {
    if (!file) {
      alert("Please upload a file first");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("algorithm", algorithm);

    try {
      const response = await axios.post(
        "http://localhost:5000/cluster_data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "clustered_data.csv");
      document.body.appendChild(link);
      link.click();

      const text = await response.data.text();
      const parsedData = text
        .split("\n")
        .slice(1)
        .map((row) => {
          const [x, y, cluster] = row.split(",");
          return {
            x: parseFloat(x),
            y: parseFloat(y),
            cluster: parseInt(cluster),
          };
        });
      setClusteredData(parsedData);
      setClusters([...new Set(parsedData.map((item) => item.cluster))]);
    } catch (error) {
      console.error("Error clustering data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Clustering Web App</h1>
      <button onClick={() => handleGenerateData("2d")}>Generate 2D Data</button>
      <button onClick={() => handleGenerateData("hierarchical")}>
        Generate Hierarchical Data
      </button>
      <button onClick={() => handleGenerateData("dbscan")}>
        Generate DBSCAN Data
      </button>
      <button onClick={() => handleGenerateData("mean_shift")}>
        Generate Mean Shift Data
      </button>

      <div>
        <h2>Cluster Your Data</h2>
        <input type="file" onChange={handleFileChange} />
        <select value={algorithm} onChange={handleAlgorithmChange}>
          <option value="kmeans">K-Means</option>
          <option value="hierarchical">Hierarchical</option>
          <option value="dbscan">DBSCAN</option>
          <option value="mean_shift">Mean Shift</option>
        </select>
        <button onClick={handleClusterData}>Cluster Data</button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {originalData.length > 0 && (
          <div>
            <h3>Original Data</h3>
            <ScatterChart width={600} height={400}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="X" />
              <YAxis type="number" dataKey="y" name="Y" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              <Scatter name="Data" data={originalData} fill="#8884d8" />
            </ScatterChart>
          </div>
        )}

        {clusteredData.length > 0 && (
          <div>
            <h3>Clustered Data</h3>
            <ScatterChart width={600} height={400}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="X" />
              <YAxis type="number" dataKey="y" name="Y" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              {clusters.map((cluster) => (
                <Scatter
                  key={cluster}
                  name={`Cluster ${cluster}`}
                  data={clusteredData.filter((d) => d.cluster === cluster)}
                  fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                />
              ))}
            </ScatterChart>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
