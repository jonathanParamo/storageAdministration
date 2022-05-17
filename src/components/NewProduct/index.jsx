import './styles.css'
import { useState } from "react";
import UploadImage from "../UploadImage";
import axios from 'axios';

function NewProduct() {

  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('ninguna');
  const [productPrice, setProductPrice] = useState('');
  const [productAmount, setProductAmount] = useState('');
  const [file, setFile] = useState([]);
  const [failValidation, setFailValidation] = useState(false);


  const handleSubmit = () => {
    if (productCategory === 'ninguna') {
      setFailValidation(true);
      return;
    }
    setFailValidation(false);

    const product = {
      productName,
      productCategory,
      productPrice,
      productAmount,
      file
    }
    // async function createNewProduct (product) {
    //   try {
    //     const res = await axios({
    //       url: '',
    //       method: 'POST',
    //       baseURL: '',
    //       URL: ''
    //     })
    //     return res
    //   } catch (error) {
    //     alert(error)
    //   }
    }

  return (
    <div className="divContainer">
      <h1>Create a new product</h1>
      <UploadImage className="image"
        value={file}
        onChange={setFile}
      />
      <div className="name">
        <div className='container-product'>
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            id="name"
            onChange={e => setProductName(e.target.value)}
            value={productName}
          />
        </div>
        <div className="price">
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={e => setProductPrice(e.target.value)}
            value={productPrice}
          />
        </div>
        <div className="category">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            onChange={e => setProductCategory(e.target.value)}
            value={productCategory}
          >
            <option value="ninguna">Ninguna</option>
            <option value="granos">Granos</option>
            <option value="harinas">Harinas</option>
            <option value="lacteos">Lacteos</option>
          </select>
        </div>
        <div className="count">
          <label htmlFor="price">Count</label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={e => setProductAmount(e.target.value)}
            value={productAmount}
          />
        </div>
        {failValidation && <p className="errorValidation">Elija una categoría</p>}
        </div>
        <button
          className="buttonProduct"
          type="submit"
          onClick={() => handleSubmit()}
        >
          Create product
        </button>
    </div>
  );
}

export default NewProduct