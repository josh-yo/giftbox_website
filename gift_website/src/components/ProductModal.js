import axios from 'axios';
import { useState } from 'react';

function ProductModal({closeProductModal}) {
    const [productData, setProductData] = useState({
        "title": "",
        "category": "",
        "origin_price": '',
        "price": '',
        "unit": "",
        "description": "",
        "content": "",
        "is_enabled": 1,
        "imageUrl": "",
    })

    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        if(['price','origin_price'].includes(name)){
            setProductData({
                ...productData,
                [name]: Number(value),
            })
        }else if(name === 'is_enabled'){
            setProductData({
                ...productData,
                [name]: +e.target.checked,
            })
        }
        else{
            setProductData({
                ...productData,
                [name]: value,
            })
        }
    }

    const submit = async() =>{
        try {
            const result = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`, {
                data: productData,
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
          className='modal fade'
          tabIndex='-1'
          id='productModal'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                    Create New Product
                </h1>
                <button
                  type='button'
                  className='btn-close'
                  aria-label='Close'
                  onClick={closeProductModal}
                />
              </div>
              <div className='modal-body'>
                <div className='row'>
                  <div className='col-sm-4'>
                    <div className='form-group mb-2'>
                      <label className='w-100' htmlFor='image'>
                        Enter Image URL
                        <input
                          type='text'
                          name='imageUrl'
                          id='image'
                          placeholder='Please input image link'
                          className='form-control'
                        />
                      </label>
                    </div>
                    <div className='form-group mb-2'>
                      <label className='w-100' htmlFor='customFile'>
                        Or Upload Image
                        <input
                          type='file'
                          id='customFile'
                          className='form-control'
                        />
                      </label>
                    </div>
                    <img src='' alt='' className='img-fluid' />
                  </div>
                  <div className='col-sm-8'>
                    <pre>
                        {JSON.stringify(productData)}
                    </pre>

                    <div className='form-group mb-2'>
                      <label className='w-100' htmlFor='title'>
                        Title
                        <input
                          type='text'
                          id='title'
                          name='title'
                          placeholder='Please input title'
                          className='form-control'
                          onChange={handleChange}
                          value={productData.title}
                        />
                      </label>
                    </div>
                    <div className='row'>
                      <div className='form-group mb-2 col-md-6'>
                        <label className='w-100' htmlFor='category'>
                            Category
                          <input
                            type='text'
                            id='category'
                            name='category'
                            placeholder='Please input category'
                            className='form-control'
                            onChange={handleChange}
                            value={productData.category}
                          />
                        </label>
                      </div>
                      <div className='form-group mb-2 col-md-6'>
                        <label className='w-100' htmlFor='unit'>
                            Unit
                          <input
                            type='unit'
                            id='unit'
                            name='unit'
                            placeholder='Please input unit'
                            className='form-control'
                            onChange={handleChange}
                            value={productData.unit}
                          />
                        </label>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='form-group mb-2 col-md-6'>
                        <label className='w-100' htmlFor='origin_price'>
                            Original Price
                          <input
                            type='number'
                            id='origin_price'
                            name='origin_price'
                            placeholder='Please input original price'
                            className='form-control'
                            onChange={handleChange}
                            value={productData.origin_price}
                          />
                        </label>
                      </div>
                      <div className='form-group mb-2 col-md-6'>
                        <label className='w-100' htmlFor='price'>
                            Sale Price
                          <input
                            type='number'
                            id='price'
                            name='price'
                            placeholder='Please input sale price'
                            className='form-control'
                            onChange={handleChange}
                            value={productData.price}
                          />
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div className='form-group mb-2'>
                      <label className='w-100' htmlFor='description'>
                        Product Description
                        <textarea
                          type='text'
                          id='description'
                          name='description'
                          placeholder='Please input product description'
                          className='form-control'
                          onChange={handleChange}
                          value={productData.description}
                        />
                      </label>
                    </div>
                    <div className='form-group mb-2'>
                      <label className='w-100' htmlFor='content'>
                        Details
                        <textarea
                          type='text'
                          id='content'
                          name='content'
                          placeholder='Please input product details'
                          className='form-control'
                          onChange={handleChange}
                          value={productData.content}
                        />
                      </label>
                    </div>
                    <div className='form-group mb-2'>
                      <div className='form-check'>
                        <label
                          className='w-100 form-check-label'
                          htmlFor='is_enabled'
                        >
                          Enable
                          <input
                            type='checkbox'
                            id='is_enabled'
                            name='is_enabled'
                            className='form-check-input'
                            onChange={handleChange}
                            value={productData.is_enabled}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={closeProductModal}
                >
                  Close
                </button>
                <button type='button' className='btn btn-primary' onClick={submit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default ProductModal;