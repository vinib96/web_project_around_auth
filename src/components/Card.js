import { useContext } from "react";
import { UserContext } from "../contexts/CurrentUserContext";

function Card({
  cardData,
  onCardClick,
  onCardLike,
  onCardDelete,
  onConfirmClick,
}) {
  const { link, name, likes, _id } = cardData;

  const currentUser = useContext(UserContext);
  const isOwn = cardData.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `elements__trash ${
    isOwn ? "elements__trash_hidden" : "elements__trash"
  }`;
  const isLiked = cardData.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `elements__like-button ${
    isLiked ? "elements__like-button_click" : ""
  }`;
  const handleLike = () => {
    onCardClick(cardData);
  };

  const handleCardClick = () => {
    onCardLike(cardData);
  };

  return (
    <>
      <li className="elements__cards">
        <div className="elements__figure-container">
          <button
            type="button"
            className={cardDeleteButtonClassName}
            onClick={() => onConfirmClick(_id)}
          >
            <img src={require("../styles/images/Trash.png")} alt="Lixo" />
          </button>
          <figure className="elements__figure">
            <img
              src={link}
              alt={name}
              className="elements__card-image"
              onClick={handleLike}
            />
          </figure>
        </div>
        <div className="elements__content">
          <p className="elements__text block">{name}</p>
          <div className="elements__like">
            <button
              type="button"
              className={cardLikeButtonClassName}
              name="like"
              onClick={handleCardClick}
            ></button>
            <p className="elements__like-counter">{likes.length}</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default Card;
