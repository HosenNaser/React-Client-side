import { useNavigate } from "react-router-dom";
import style from "../style/pagination.module.scss";

export default function Pagination(props: any) {
  const navigate = useNavigate();
  const currentPage: number = Number.parseInt(props.pagination.currentPage);
  const prev: number = currentPage > 1 ? currentPage - 1 : currentPage;
  const next: number = currentPage < props.pagination.TotalPages ? currentPage + 1 : currentPage;

  let pagesNum = [];
  for (
    let i = 1;
    i <= props.pagination.TotalPages && props.pagination.TotalPages < props.pagination.paginationSize;
    i++
  ) {
    pagesNum.push(
      <li key={i} className={`${style.current} ${currentPage === i ? style.active : null}`}>
        <button onClick={() => navigate(`/DashBoard/${i}`)} className={style.link}>
          {i}
        </button>
      </li>
    );
  }

  return (
    <div className={style.pagination}>
      <li className={`${style.pageItem} ${style.prevPage}  `}>
        <button onClick={() => navigate(`/Dashboard/${prev}`)} className={style.link}>
          Prev
        </button>{" "}
      </li>
      {pagesNum}
      <li className={`${style.pageItem} ${style.nextPage}`}>
        <button onClick={() => navigate(`/Dashboard/${next}`)} className={style.link}>
          Next
        </button>
      </li>
    </div>
  );
}
