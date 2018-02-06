import React from 'react';
import { Button, Grid } from 'semantic-ui-react'

const Pagination = (pageData) => {
  const pages = [];
  const { currentPage = 1, hasPrev = false, hasNext = false, nextPage = 0, prevPage = 0, totalPage = 1 } = pageData;
  // 當在倒數幾頁的時候就不能使用最大值 10 筆，要依據 totalPage 除 10 的餘數
  const totalDeciles = Math.floor(totalPage / 10);
  const currentDeciles = Math.floor((currentPage - 1) / 10); // -1 避免在第十頁時會算成 11 - 21
  let index = 1;
  let max = 10;

  if (totalDeciles === currentDeciles) {
    max = totalPage % 10;
  }

  for (index; index <= max; index++) {
    const page = (10 * currentDeciles) + index;
    if (currentPage === page) {
      pages.push(<Button basic color='blue' key={page}>{page}</Button>);
    } else {
      pages.push(<Button basic key={page} href={`?page=${page}`}>{page}</Button>);
    }
  }

  return (
    <Grid textAlign='center'>
      <Button.Group>
        { hasPrev
          ? <Button basic href={`?page=${prevPage}`}>Prev</Button>
          : <Button basic>Prev</Button>}
        { pages }
        { hasNext
          ? <Button basic href={`?page=${nextPage}`}>Next</Button>
          : <Button basic>Next</Button>}
      </Button.Group>
    </Grid>
  );
};

export default Pagination
