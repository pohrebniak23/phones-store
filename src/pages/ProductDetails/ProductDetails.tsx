import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import { getProductItem } from "../../api/api";
import { ProductItem } from "../../types/ProductItem";
import { ProductInfo } from "../../types/ProductInfo";
import { BreadCrumbs } from "../../components/BreadCrumbs";
import { BackBtn } from "../../components/BackBtn";
import { AddToCartBtn } from "../../components/AddToCartBtn";
import { AddFavouriteBtn } from "../../components/AddFavouriteBtn";
import { ProductsSlider } from "../../components/ProductsSlider";

import "./productDetails.scss";

export const ProductDetails: React.FC = () => {
  const [productDetails, setProductDetails] = useState<ProductInfo>();
  const [productInfo, setProductInfo] = useState<ProductItem>();
  const { productId } = useParams();
  const [currentImage, setCurrentImage] = useState("");
  const [currentColor, setCurrentColor] = useState();
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    if (productId) {
      getProductItem(productId).then((data) => {
        setProductDetails(data);
        setCurrentColor(data.images[0].colorId);
        setCurrentImage(data.images[0].src[0]);
        setCapacity(data.storage.capacity);
        setProductInfo(data);
      });
    }
  }, [productId]);
  

  useEffect(() => {
    setCurrentImage(
      productDetails?.images.find((item: any) => item.colorId === currentColor)
        .src[0]
    );
  }, [currentColor]);

  const setPrice = () => {
    if (productDetails) {
      if (productDetails.discount > 0) {
        const discount = (productDetails.price / 100) * productDetails.discount;

        return (
          <>
            {`$${(productDetails.price - discount).toFixed(0)}`}
            <span>{`$${productDetails.price}`}</span>
          </>
        );
      }

      return <>{`$${productDetails.price}`}</>;
    }

    return "";
  };

  return (
    <div className="product">
      {productDetails && (
        <div className="container">
          <BreadCrumbs title={productDetails.name} />

          <BackBtn />

          <div className="product__content">
            <h1 className="product__title">{productDetails.name}</h1>
            <div className="product__block">
              {productDetails.images && currentColor && (
                <div className="product__gallary gallary">
                  <div className="gallary__thumbs">
                    {productDetails.images
                      .find((item: any) => item.colorId === currentColor)
                      .src.map((image: any) => (
                        <button
                          key={image.colorId}
                          type="button"
                          className={classNames("gallary__thumbItem", {
                            gallary__thumbItem_active: currentImage === image,
                          })}
                          onClick={() => setCurrentImage(image)}
                        >
                          <img src={`${image}`} alt="" />
                        </button>
                      ))}
                  </div>
                  <div className="gallary__image">
                    <img src={`${currentImage}`} alt="" />
                  </div>
                </div>
              )}

              <div className="product-options">
                <div className="product-colors">
                  <span>Available colors</span>
                  <div className="product-colors__block">
                    {productDetails.images &&
                      productDetails.images.map((item: any) => (
                        <div
                          key={item.colorId}
                          onClick={() => setCurrentColor(item.colorId)}
                          className={classNames("product-colors__item", {
                            "product-colors__item_active": item.colorId === currentColor,
                          })}
                        >
                          <div
                            className="circle"
                            style={{ backgroundColor: item.colorId }}
                          ></div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="product-memory">
                  <span>Select capacity</span>
                  <div className="product-memory__block">
                    {productDetails.storage.availableCapacity &&
                      productDetails.storage.availableCapacity.map((item: any) => (
                        <div
                          key={item.name}
                          onClick={() => setCapacity(item.name)}
                          className={classNames("product-memory__item", {
                            "product-memory__item_active":
                              item.name === capacity,
                          })}
                        >
                          <Link to={`/${productDetails.type}s/${item.link}`}>
                            {item.name}
                          </Link>
                        </div>
                      ))}
                  </div>
                </div>
                {productDetails && (
                  <div className="product-options__price">{setPrice()}</div>
                )}
                <div className="product-options__buttons">
                  {productId && productDetails && (
                    <>
                      <AddToCartBtn id={productId} color={currentColor} />
                      <AddFavouriteBtn id={productId} />
                    </>
                  )}
                </div>
                <div className="tech-specs__block">
                  {productDetails.display.screenSize && (
                    <div className="tech-specs__item">
                      <span>Screen</span>
                      <p>{productDetails.display.screenSize}</p>
                    </div>
                  )}
                  {productDetails.display.screenResolution && (
                    <div className="tech-specs__item">
                      <span>Resolution</span>
                      <p>{productDetails.display.screenResolution}</p>
                    </div>
                  )}
                  {productDetails.hardware.cpu && (
                    <div className="tech-specs__item">
                      <span>Processor</span>
                      <p>{productDetails.hardware.cpu}</p>
                    </div>
                  )}
                  {productDetails.storage.ram && (
                    <div className="tech-specs__item">
                      <span>RAM</span>
                      <p>{productDetails.storage.ram}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="product__bottom">
              <div className="product__descr">
                <h2 className="product__subtitle">About</h2>
                <p>{productDetails.description}</p>
              </div>
              <div className="tech-specs">
                <h2 className="product__subtitle">Tech specs</h2>
                <div className="tech-specs__block">
                  {productDetails.display.screenSize && (
                    <div className="tech-specs__item">
                      <span>Screen</span>
                      <p>{productDetails.display.screenSize}</p>
                    </div>
                  )}
                  {productDetails.display.screenResolution && (
                    <div className="tech-specs__item">
                      <span>Resolution</span>
                      <p>{productDetails.display.screenResolution}</p>
                    </div>
                  )}
                  {productDetails.hardware.cpu && (
                    <div className="tech-specs__item">
                      <span>Processor</span>
                      <p>{productDetails.hardware.cpu}</p>
                    </div>
                  )}
                  {productDetails.storage.ram && (
                    <div className="tech-specs__item">
                      <span>RAM</span>
                      <p>{productDetails.storage.ram}</p>
                    </div>
                  )}
                  {productDetails.storage.capacity && (
                    <div className="tech-specs__item">
                      <span>Built in memory</span>
                      <p>{productDetails.storage.capacity}</p>
                    </div>
                  )}
                  {productDetails.camera.primary && (
                    <div className="tech-specs__item">
                      <span>Camera</span>
                      <p>{productDetails.camera.primary}</p>
                    </div>
                  )}
                  {productDetails.connectivity.cell && (
                    <div className="tech-specs__item">
                      <span>Cell</span>
                      <p>{productDetails.connectivity.cell}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <ProductsSlider
        productsList={getsuggProducts()}
        title="Hot prices"
        sliderSettings={{
          dots: false,
          arrows: true,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
        }}
      /> */}
    </div>
  );
};