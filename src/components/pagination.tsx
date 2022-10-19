import style from "../style/pagination.module.scss";

export default function Pagination(props: any) {
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
        <a href={`/Dashboard/${i}`} className={style.link}>
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className={style.pagination}>
      <li className={`${style.pageItem} ${style.prevPage}  `}>
        <a href={`/Dashboard/${prev}`} className={style.link}>
          Prev
        </a>{" "}
      </li>
      {pagesNum}
      <li className={`${style.pageItem} ${style.nextPage}`}>
        <a href={`/Dashboard/${next}`} className={style.link}>
          Next
        </a>
      </li>
    </div>
  );
}
