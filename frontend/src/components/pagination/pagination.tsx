const Pagination = (): JSX.Element => {
  //! временно
  const page = '?page=';

  return (
    <div className="pagination product-list__pagination">
      <ul className="pagination__list">
        <li className="pagination__page pagination__page--active"><a className="link pagination__page-link" href={page + 1}>1</a>
        </li>
        <li className="pagination__page"><a className="link pagination__page-link" href={page + 2} >2</a>
        </li>
        <li className="pagination__page"><a className="link pagination__page-link" href={page + 3}>3</a>
        </li>
        <li className="pagination__page pagination__page--next" id="next"><a className="link pagination__page-link" href="2">Далее</a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
