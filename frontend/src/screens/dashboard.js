import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col,Table } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { listProducts } from "../actions/productActions";
import { listOrders } from '../actions/orderActions'

import Footer from "../components/Footer"

const Dashboard = ({ match }) => {
    const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

const orderList = useSelector((state) => state.orderList)
  const { oloading, oerror, orders } = orderList

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      match.push('/login')
    }
  }, [dispatch, match, userInfo])

  return (
    <>
      

      <h1>Dashboard</h1>
      
      <Table className='table-sm product-list'>
          <thead>
            <tr>
              <th>Total Products</th>
              <th>Total Orders</th>
              
            </tr>
          </thead>
            <tr>
                <td>{products.length}</td>
                {orders ?(
                <td>{orders.length}</td>
                )
                :(
                    <td>0</td>
                    )
            }
            </tr>
          <tbody>
        </tbody>
    </Table>
        
      
      
    </>
   
  );
};

export default Dashboard;
