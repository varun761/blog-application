import "./index.scss";

const PostInfo = ({ list }) => {
  if (list.length === 0) return null;
  return (
    <ul className="post-info">
      {list.map((el, elIndex) => {
        const indexed = elIndex + 1;
        if (indexed % 2 === 0 || indexed % 3 === 0) {
          return (
            <>
              <li className="dot">.</li>
              <li>{el}</li>
            </>
          );
        }
        return <li key={`post_info_${indexed}`}>{el}</li>;
      })}
    </ul>
  );
};

PostInfo.defaultProps = {
  list: [],
};

export default PostInfo;
