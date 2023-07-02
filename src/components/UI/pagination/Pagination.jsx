import React from 'react'
import { getPageArray } from '../../../utils/pages';
import classes from './Pagination.module.css'

export default function Pagination({ totalPages, changePage, page }) {
  let pagesArray = getPageArray(totalPages);
  return (
    <div className={classes.pageWrapper}>
        {pagesArray.map(p =>
          <span
            key={p}
            className={page === p ? `${classes.page} + ' ' + ${classes.pageCurrent}` : classes.page}
            onClick={() => changePage(p)}
          >
            {p}
          </span>
        )}
      </div>
  )
}
