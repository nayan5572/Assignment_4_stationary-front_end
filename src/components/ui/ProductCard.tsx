import { Card, message } from "antd";
import { TProduct } from "../../types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/feathers/cart/cartSlice";

interface ProductCardProps {
  product: TProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!product.stock) {
      message.warning(`This items are available in stock.`);
      return;
    }
    dispatch(addToCart({ product, quantity: 1 }));
    message.success("Product added to cart!");
  };

  return (
    <Card
      hoverable
      cover={
        <img
          src={product.photo}
          alt={product.name || "Product image"}
          className="h-48 w-full object-cover"
        />
      }
      onClick={handleProductDetails}
      className="overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105"
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {product.name} - {product.category}
        </h2>
        <p className="text-sm text-gray-600 mt-1 truncate">
          {product.description || "No description available."}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          In Stock: <span className="font-bold">{product.inStock}</span>
        </p>
        <p className="text-lg font-bold text-gray-900 mt-3">
          ${product.price.toFixed(2)}
        </p>

        {product?.inStock !== undefined && product.inStock > 0 ? (
          <button
            onClick={handleAddToCart}
            className="bg-blue-400 cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="bg-gray-500 cursor-not-allowed !text-white px-6 py-2 rounded-lg"
          >
            Out of Stock
          </button>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
