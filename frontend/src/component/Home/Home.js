import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();

  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  console.log(products)

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="E-Commerce" />

          <div className="banner">
            <p>Welcome to E-Commerce</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />{" "}
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <Product key={product._id} product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
