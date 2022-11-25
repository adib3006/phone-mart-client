import React from 'react';

const CategoryCard = ({category}) => {
    const {categoryName, categoryImage} = category;
    return (
        <div className="card w-96 bg-base-100 shadow-xl hover:cursor-pointer hover:shadow-2xl">
            <figure className="px-10 pt-10">
                <img src={categoryImage} alt="" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{categoryName}</h2>
            </div>
        </div>
    );
};

export default CategoryCard;