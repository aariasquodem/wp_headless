import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from '../Home';
import Articles from '../Articles';
import ArticleDetail from '../ArticleDetail';
import Products from '../Products';
import ProductDetail from '../ProductDetail';

const Main = () => {
  return <>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/articles" element={<Articles/>}/>
            <Route path="/articledetail" element={<ArticleDetail/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/productdetail" element={<ProductDetail/>}/>
          </Routes>
        </>;
};

export default Main;
