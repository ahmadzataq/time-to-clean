import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import Swal from "sweetalert2";
import "./cart.css";

const Cart = () => {
  // ADD TO CART
  const {
    isEmpty,
    cartTotal,
    totalItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const claerCart = () => {
    Swal.fire({
      text: "Apakah anda yakin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        emptyCart();
      }
    });
  };

  return (
    <>
      <table className="cartTable">
        <tr>
          <th>Nama</th>
          <th>Harga</th>
          <th>Banyaknya</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
        {isEmpty ? (
          <tr>
            <td colSpan="6">Keranjang Anda Kosong.</td>
          </tr>
        ) : (
          items.map((item) => (
            <tr>
              <td>{item.name.slice(0, 20)}...</td>
              <td>Rp. {item.price}</td>
              <td>
                <button
                  className="btn-primary"
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>{" "}
                <span className="item-qty">{item.quantity}</span>{" "}
                <button
                  className="btn-primary"
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </td>
              <td>Rp. {item.itemTotal}</td>
              <td>
                <Link
                  onClick={() => removeItem(item.id)}
                  className="btn-danger clear-one"
                >
                  X
                </Link>
              </td>
            </tr>
          ))
        )}
        {!isEmpty && (
          <>
            <tr className="bold">
              <td colSpan="2">Total</td>
              <td>{totalItems}</td>
              <td>Rp. {cartTotal}</td>
              <td>
                <Link
                  className="btn-danger clear-all"
                  onClick={() => claerCart()}
                >
                  Clear All
                </Link>
              </td>
            </tr>
            <tr>
              <td colSpan={5}>
                <Link to="/order" className="confirm-order">
                  Konfirmasi Pesanan
                </Link>
              </td>
            </tr>
          </>
        )}
      </table>
    </>
  );
};

export default Cart;
