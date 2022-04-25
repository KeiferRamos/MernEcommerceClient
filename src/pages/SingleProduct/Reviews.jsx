import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { FiSend, FiTrash, FiEdit } from "react-icons/fi";
import SingleProduct from "./SingleProduct";

function Reviews({}) {
  const {
    likesCount,
    dislikesCount,
    liked,
    disliked,
    comments,
    relatedProducts,
    usercomment,
    currUser,
    isEditing,
    errMsg,
    updateDislikes,
    updateLikes,
    setUsercomment,
    navigateUser,
    AddComment,
    deleteUsercomment,
    editComment,
  } = SingleProduct();

  return (
    <div className="reviews">
      <div className="head">
        <h3>Reviews</h3>
        <div>
          <p>{likesCount}</p>
          <FaThumbsUp
            style={{ color: liked ? "#41728d" : "#fff" }}
            onClick={() => updateLikes()}
          />
        </div>
        <div>
          <p>{dislikesCount}</p>
          <FaThumbsDown
            style={{ color: disliked ? "#d72362" : "#fff" }}
            onClick={() => updateDislikes()}
          />
        </div>
      </div>
      <div className="comments">
        {errMsg && <p className="error">{errMsg}</p>}
        <div className="comments-container">
          {comments.map((comments, i) => {
            const { username, comment, _id } = comments;
            return (
              <div key={i}>
                <h3>{username}</h3>
                <p>{comment}</p>
                {currUser == username && (
                  <div className="comments-btn">
                    <FiTrash onClick={() => deleteUsercomment(_id)} />
                    <FiEdit onClick={() => editComment(_id)} />
                  </div>
                )}
              </div>
            );
          })}
          {comments.length == 0 && <p style={{ color: "#fff" }}>No comments</p>}
        </div>
        <div className="user-comment">
          <textarea
            type="text"
            placeholder="type here.."
            value={usercomment}
            onChange={(e) => setUsercomment(e.target.value)}
          />
          <button className="comment-icon" onClick={() => AddComment()}>
            {isEditing ? <FiEdit /> : <FiSend />}
          </button>
        </div>
      </div>
      <div className="related-products">
        {relatedProducts.map((product, i) => {
          const { name, brand, img } = product;
          return (
            <div key={i} onClick={() => navigateUser(name)}>
              <img src={img} alt="product image" />
              <p>{brand}</p>
              <p>{name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
