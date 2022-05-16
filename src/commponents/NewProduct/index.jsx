import './styles.css'
import { useState } from "react";
import UploadImage from "../UploadImage";

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

    const producto = {
      productName,
      productCategory,
      productPrice,
      productAmount,
      file
    }
    console.log('xxx producto: ', producto);
    // const { data } = axios({

    // });
  }

  return (
    <div className="div-container">
      <h1>Create a new product</h1>
      <UploadImage
        value={file}
        onChange={setFile}
      />
      <div className='div-product'>
        <div className='container-product'>
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            id="name"
            onChange={e => setProductName(e.target.value)}
            value={productName}
          />
        </div>
        <div className='container-product'>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            name="price"
            id="price"
            onChange={e => setProductPrice(e.target.value)}
            value={productPrice}
          />
        </div>
        <div className='container-product'>
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
        <div className='container-product'>
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
          className='button-product'
          type="submit"
          onClick={() => handleSubmit()}
        >
          Create product
        </button>
    </div>
  );
}

export default NewProduct