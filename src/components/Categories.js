import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CategoryCard from './CategoryCard';
import { Link } from 'react-router-dom';

const Categories = () => {
    const {data:categories = []} = useQuery({
        queryKey:['categories'],
        queryFn: async ()=>{
            const res = await fetch('https://phone-mart-server.vercel.app/categories');
            const data = await res.json();
            return data;
        }
    })

    return (
        <div className='mb-10'>
            <h1 className="text-5xl font-bold text-center mt-20 mb-10">Categories</h1>
            <div className='md:ml-10 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    categories.map((category,i) => <Link key={i} to={`/categories/${category._id}`}><CategoryCard 
                        key={category._id} 
                        category={category}
                        ></CategoryCard></Link>)
                }
            </div>
        </div>
    );
};

export default Categories;