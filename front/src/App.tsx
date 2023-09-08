/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import NavBar from "./components/NavBar/NavBar";
import { Container, Grid } from "@mui/material";

export interface Product {
  code?: number;
  name?: string;
  sales_price?: number;
  old_sales_price?: number;
  cost_price?: number;
}


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [responseData, setResponseData] = useState(null);
  const [updateResponseData, setUpdateResponseData] = useState(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.name.toLowerCase().endsWith(".csv")) {
        setFile(selectedFile);
      } else {
        alert("Arquivo de Precificação deve ser .CSV");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
      setResponseData(null);
    }
  };

  const upload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:3000/validate-products", formData)
        .then((res) => {
          setResponseData(res.data);
          setUpdateResponseData(null)
          console.log(JSON.stringify(res.data));
        })
        .catch((er) => {
          alert(er.response.data);
        });
    } else {
      alert("Arquivo não selecionado");
    }
  };

  const update = () => {
    axios
      .patch("http://localhost:3000/update-products", responseData)
      .then((res) => {
        setNewProducts(res.data);
        setUpdateResponseData(res.data);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
          setResponseData(null);
        }
      })
      .catch((er) => {
        alert(er.response.data);
      });
  };

  return (
    <>
      <div className="firstView">
        <NavBar />
        <div className="content">
          <div className="fileCard">
            <input
              type="file"
              className="inputFile"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <div className="buttons">
              <button type="button" onClick={upload}>
                Validar
              </button>
              {responseData && (
                <div>
                  <button type="button" onClick={update}>
                    Atualizar
                  </button>
                </div>
              )}
            </div>
          </div>
            <Container className="cards">
            <Grid container spacing={1}>
              {updateResponseData &&
                newProducts.map((item, index) => (
                  <Grid item xs={3} key={index}>
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <p> <span>Produto:</span> {item.name}</p>
                        <p> <span>Código:</span> {item.code}</p>
                        <p> <span className="newPrice">Novo preço:</span> {item.sales_price}</p>
                        <p> <span >Preço atual:</span> {item.old_sales_price}</p>
                      </div>
                      <div className="flip-card-back">
                        <p className="title"></p>
                        <img src="./src/assets/shopper.png" alt="" />
                      </div>
                    </div>
                  </div>
                  </Grid>
                ))}
                </Grid>
            </Container>
          
        </div>
      </div>
    </>
  );
}

export default App;
