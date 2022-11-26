import React, { useContext } from 'react';
import { AuthContext } from './../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const image = form.image.files[0];
        const resellPrice = form.resellPrice.value;
        const condition = form.condition.value;
        const categoryId = form.categoryId.value;
        const phoneNumber = form.phoneNumber.value;
        const originalPrice = form.originalPrice.value;
        const description = form.description.value;
        const location = form.location.value;
        const yearsOfUse = form.yearsOfUse.value;
        // const postDate = new Date();
        const report = false;
        const advertise = false;
        const sold = false;

        const formData = new FormData();
        formData.append('image', image);

        const url = "https://api.imgbb.com/1/upload?key=b061ec1a58988f7f375c0629ea0844cd";

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                const phone = {
                    name,
                    image: imageData.data.display_url,
                    resellPrice,
                    condition,
                    categoryId,
                    phoneNumber,
                    originalPrice,
                    description,
                    location,
                    yearsOfUse,
                    // postDate,
                    report,
                    advertise,
                    sold,
                    sellerName: user.displayName,
                    sellerEmail: user.email
                }
                console.log(phone);

                fetch('http://localhost:5000/dashboard/add-product', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(phone)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            form.reset();
                            toast.success('Phone added successfully');
                            navigate('/dashboard/my-products');
                        }
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='w-1/2'>
                <h1 className="text-5xl text-center my-5">Add a Product</h1>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3'>
                    <input name='name' placeholder='Product Name' type="text" className="input w-full input-bordered" />
                    <input type='file' id='image' name='image' accept='image/*' />
                    <input name='resellPrice' placeholder='price' type="text" className="input w-full input-bordered" />
                    <select name='condition' className='select select-bordered w-full'>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="excellent">Excellent</option>
                    </select>
                    <select name='categoryId' className='select select-bordered w-full'>
                        <option value="01">Android</option>
                        <option value="02">Apple</option>
                        <option value="03">Feature</option>
                    </select>
                    <input name='phoneNumber' placeholder='phone number' type="text" className="input w-full input-bordered" />
                    <input name='originalPrice' placeholder='Original price' type="text" className="input w-full input-bordered" />
                    <input name='description' type="text" placeholder="description" className="input w-full input-bordered" />
                    <input name='location' type="text" placeholder="Meeting Location" className="input w-full input-bordered" />
                    <input name='yearsOfUse' type="text" placeholder="Years of use" className="input w-full input-bordered" />
                    <input type="submit" value="Submit" className='w-full btn btn-primary' />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;