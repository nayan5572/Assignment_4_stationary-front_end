import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/feathers/product/productApi";
import { Skeleton, Alert, message, Button, InputNumber } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feathers/cart/cartSlice";

const SingleProduct = () => {
  const { productId } = useParams();
  const {
    data: singleProductData,
    isFetching,
    isError,
  } = useGetSingleProductQuery(productId);
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleDescription = () => setIsExpanded((prev) => !prev);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (singleProductData) {
      if (!singleProductData.stock) {
        message.warning(`This items are available in stock.`);
        return;
      }

      dispatch(addToCart({ product: singleProductData, quantity }));
      message.success("Product added to cart!");
      setQuantity(1);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col md:flex-row gap-8 p-8">
        <div className="w-full min-h-[calc(72vh-64px-50px)] md:w-1/2 flex items-center justify-center">
          <Skeleton.Image style={{ width: 200, height: 200 }} />
        </div>
        <div className="w-full min-h-[calc(72vh-64px-50px)] md:w-1/2 flex items-center justify-center ">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert
          message="Error"
          description="Failed to fetch product details. Please try again later."
          type="error"
          showIcon
        />
      </div>
    );
  }
  return (
    <div className="flex bg-[#F9F9FB] flex-col md:flex-row  gap-8 px-6 md:px-0 py-30">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <img
          src={singleProductData?.photo ?? "/placeholder-image.png"}
          alt={singleProductData?.name ?? "Product Image"}
          className="rounded-lg w-full max-w-xs md:max-w-md lg:max-w-lg shadow-lg object-contain h-auto max-h-[500px]"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-between">
        <div className="flex flex-col flex-grow">
          <div className="text-sm text-gray-500 mb-2">
            <span>Stationery</span>
            <span className="mx-1">→</span>
            <span>{singleProductData?.category || "N/A"}</span>
          </div>

          <h1 className="text-[24px] font-semibold text-gray-800 mb-2">
            {singleProductData?.name || "Product Name"}
          </h1>
          <h1 className="text-[20px] font-semibold text-gray-800 mb-2">
            Brand: {singleProductData?.brand || "Brand"}
          </h1>
          <h1 className="text-[20px] font-semibold text-gray-800 mb-4">
            Category: {singleProductData?.category || "Category"}
          </h1>
          <h1 className="text-[20px] font-semibold text-gray-800 mb-4">
            In Stock: : {singleProductData?.inStock || "Category"}
          </h1>

          <div className="mb-6">
            <p
              className={`text-gray-600 text-sm leading-relaxed ${
                isExpanded ? "" : "line-clamp-3"
              }`}
            >
              {singleProductData?.description ||
                "No description available for this product."}
            </p>
            {singleProductData?.description &&
              singleProductData?.description.length > 400 && (
                <button
                  onClick={toggleDescription}
                  className="text-blue-600 text-sm font-medium mt-2"
                >
                  {isExpanded ? "Show Less" : "Read More"}
                </button>
              )}
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div>
          <p className="text-2xl font-bold text-gray-900 mb-4">
            USD ${singleProductData?.price || "0.00"}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Order within 4 hours and get it delivered by today
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Button
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <InputNumber
                min={1}
                max={singleProductData?.inStock || 0}
                value={quantity}
                className="w-20"
                onChange={(value) => value && handleQuantityChange(value)}
              />
              <Button
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= (singleProductData?.inStock || 0)}
              >
                +
              </Button>
            </div>
            <button
              className="bg-blue-400 cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
