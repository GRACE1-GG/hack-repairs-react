import { React, useEffect, useState } from "react";
import CreateProducts from "./products";
import PTable from "./tableHandler";
import CreateCategory from "./categories";
import CreateSubCategory from "./subcategories";
import axios from "axios";
import CategoriesTable from "./categoriesTable";
import SubCategoriesTable from "./subcategoriesTable";
import PostersTable from "./postersTable.jsx";
import CreateAdd from "../createAdd.jsx";
import CreateImages from "./imageHandler.jsx";

const initialProducts = [];

const ProductsTable = () => {
  const [showModal, setShodal] = useState(false);
  const [showAddModal, setShowModal] = useState(false)
  const [showCategoriesModal, setCategories] = useState(false);
  const [showSubCategoriesModal, setSubcategories] = useState(false);
  const [products, setProducts] = useState(initialProducts);

  const activateAdd = ()=>{
    setShowModal(true)
  }

  const closeAdd = () =>{
    setShowModal(false)
  }

  const handleCall = () => {
    setShodal(true);
  };
  const handleCallClose = () => {
    setShodal(false);
  };

  // Categories Modal
  const handleCatCall = () => {
    setCategories(true);
  };
  const handleCatCallClose = () => {
    setCategories(false);
  };

  // Subcategories Modal
  const handleSubCatCall = () => {
    setSubcategories(true);
  };
  
  const handleSubCatCallClose = () => {
    setSubcategories(false);
  };
  
// fetch products
useEffect(()=>{
  fetchProducts()
},[])

// function to fetch products
const fetchProducts = async()=>{
  try {
    const response = await axios.get("https://api.wemitraders.co.ke/products")
    
    setProducts(response.data)
    
  } catch (error) {
    console.log(error)
    
  }
}
  const tabs = [
    { name: 'Products', content: <PTable products={products} fetchProducts={fetchProducts} outOffStock={false}/> },
    { name: 'Categories', content: <CategoriesTable/> },
    { name: 'Subcategories', content: <SubCategoriesTable/> },
    { name: 'Posters & Advertisements', content: <PostersTable/> },
    { name: 'Images & Videos', content: <CreateImages products={products}/> },
    { name: 'Out Of Stock', content: <PTable products={products} fetchProducts={fetchProducts} outOffStock={true}/> },
  ];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white rounded-lg min-h-[85vh] mt-2 shadow-lg p-5">
      <div className="flex justify-between">
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded mb-4 outline-none"
            onClick={() => {
              handleCall();
            }}
          >
            Create Product
          </button>
        </div>
        <div>
        <button
            className="bg-blue-500 mr-5 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded mb-4 outline-none"
            onClick={() => {
              handleCatCall();
            }}
          >
            Create Category
        </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded mb-4 outline-none"
            onClick={() => {
              handleSubCatCall();
            }}
          >
            Create Subcategory
        </button>
        </div>
      </div>
      <div className="flex flex-col justify-between bg-gray-100 w-full">
        <div className="w-full bg-blue-900">
          <div className="flex space-x-4 border-gray-300">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`text-sm py-3 px-4 font-semibold 
                    transition outline-none duration-300 ${
                  index === activeTab
                    ? 'border-t-2 border-blue-500 bg-white text-black'
                    : 'text-white'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.name}
              </button>
            ))}
          </div>
          <div className="p-4 bg-white">
            {tabs[activeTab].content}
          </div>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
				<button className='bg-orange-500 w-[60px] h-[60px] rounded-full flex justify-center p-5 animate-bounce' onClick={() => {
          			activateAdd();
        		}}>
					<span>
								<img src="/assets/plus.svg" alt="" className="w-[20px] h-[20px]"/>
					</span>
				</button>
    		</div>
      {showModal && <CreateProducts handleCallClose={handleCallClose} />}
      {showCategoriesModal && <CreateCategory handleCatClose={handleCatCallClose}/>}
      {showSubCategoriesModal && <CreateSubCategory handleSubcatclose={handleSubCatCallClose}/>}
      {showAddModal && <CreateAdd handleCallClose={closeAdd} />}
    </div>
  );
};

export default ProductsTable;