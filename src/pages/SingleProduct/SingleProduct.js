import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useGlobalContext from "../../Helper/AppProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SingleProduct() {
  const { productURI, usersURI, Info, setInfo } = useGlobalContext();
  const { productName } = useParams();
  const nav = useNavigate();
  const [likesCount, setLikescount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setdisliked] = useState(false);
  const [isEditing, setisEditing] = useState(false);
  const [usercomment, setUsercomment] = useState("");
  const [currUser, setcurrUser] = useState("");
  const [editID, seteditID] = useState("");
  const [errMsg, seterrMsg] = useState("");
  const [sucessMsg, setsuccessMsg] = useState("");
  const [relatedProducts, setrelatedProducts] = useState([]);
  const [comments, setcomments] = useState([]);
  const [singleProduct, setsingleProduct] = useState({});

  const getColor = (color) => {
    setInfo({ ...Info, preferredColor: color });
  };

  const editComment = async (id) => {
    const { data } = await axios.patch(`${productURI}/usercomment/${id}`, {
      name: productName,
    });
    const comment = data.comment;
    setUsercomment(comment);
    setisEditing(true);
    seteditID(id);
  };

  const addToCart = async () => {
    try {
      const items = await axios.get(`${productURI}?name=${productName}`);
      const { brand, img, name, price } = items.data[0];
      const item = {
        brand: brand,
        img: img,
        name: name,
        price: price,
      };
      const { data } = await axios.post(usersURI + "/cart", {
        color: Info.preferredColor,
        item,
      });
      setsuccessMsg(data.msg);
    } catch (err) {
      seterrMsg(err.response.data.msg);
      console.log(err.response.data.msg);
    }
  };

  const getProductLikesAndDislikes = async () => {
    const { data } = await axios.get(productURI);
    const product = data.find((product) => product.name == productName);
    const user = await axios.get(usersURI);
    const { likes, dislikes } = product;
    setLiked(likes.includes(user.data._id) ? true : false);
    setdisliked(dislikes.includes(user.data._id) ? true : false);
    setLikescount(likes.length);
    setDislikesCount(dislikes.length);
  };

  const navigateUser = (name) => {
    nav(`/products/${name}`);
    window.location.reload();
  };

  const getCurrentUser = async () => {
    const user = await axios.get(usersURI);
    setcurrUser(user.data.username);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      seterrMsg("");
    }, 750);
    return () => clearTimeout(timer);
  }, [errMsg]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setsuccessMsg("");
    }, 750);
    return () => clearTimeout(timer);
  }, [sucessMsg]);

  const getRelatedProduct = async () => {
    const response = await axios.get(`${productURI}?name=${productName}`);
    const thisProduct = response.data[0];
    const { brand, category } = thisProduct;
    const { data } = await axios.get(productURI);
    const products = data.filter(
      (item) => item.category == category || item.brand == brand
    );
    setrelatedProducts(
      products.filter((product) => product.name !== thisProduct.name)
    );
  };

  const getAllProductComments = async () => {
    const { data } = await axios.get(
      `${productURI}/allcomments/${productName}`
    );
    const productComments = data;
    setcomments(productComments);
  };

  const AddComment = async () => {
    try {
      if (isEditing) {
        await axios.patch(`${productURI}/editcomment`, {
          id: editID,
          comment: usercomment,
        });
        setisEditing(false);
      } else {
        const { data } = await axios.get(usersURI);
        await axios.patch(`${productURI}/comments/${productName}`, {
          username: data.username,
          comment: usercomment,
        });
      }
      setUsercomment("");
      getAllProductComments();
    } catch (err) {
      if (err.response) {
        seterrMsg(err.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getProductLikesAndDislikes();
    getRelatedProduct();
    getAllProductComments();
    getCurrentUser();
  }, []);

  const deleteUsercomment = async (id) => {
    await axios.patch(`${productURI}/deletecomment/${id}`, {
      name: productName,
    });
    getAllProductComments();
  };

  const updateLikes = async () => {
    await axios.patch(`${productURI}/${productName}/likes/dislikes`);
    getProductLikesAndDislikes();
  };

  const updateDislikes = async () => {
    await axios.patch(`${productURI}/${productName}/dislikes/likes`);
    getProductLikesAndDislikes();
  };

  const getSingleProduct = async () => {
    const { data } = await axios.get(`${productURI}?name=${productName}`);
    setsingleProduct(data[0]);
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  return {
    dislikesCount,
    likesCount,
    singleProduct,
    productName,
    liked,
    disliked,
    comments,
    relatedProducts,
    usercomment,
    currUser,
    isEditing,
    errMsg,
    sucessMsg,
    updateDislikes,
    updateLikes,
    navigateUser,
    setUsercomment,
    AddComment,
    deleteUsercomment,
    editComment,
    getColor,
    addToCart,
  };
}

export default SingleProduct;
