import { cat } from "./Quote/Quote";

const CategoryButtons = ({ category, handleClick }) => {
  return (
    <button onClick={handleClick} className="btn btn-sm btn-outline btn-accent">
      {category}
    </button>
  );
};

export default CategoryButtons;
