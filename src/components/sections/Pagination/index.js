/* eslint-disable import/no-anonymous-default-export */
import React, { useRef } from 'react'
import Pagination from './presenter'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../../../slices/items/filter/filterSlice'
import { itemsSelectors } from "./../../../slices/items/itemSlice";


export default () => {
    const page = useSelector((state) => state.filter.page)
    const count = useSelector((itemsSelectors.selectTotal))
    const pageCount = Math.ceil(count/10)
    const dispatch = useDispatch()
    const previousRequest = useRef()
  
    const onPageChangeHandler = (_, selectedPage) => {
      if (previousRequest.current) {
        previousRequest.current.abort()
      }
      previousRequest.current = dispatch(setPage(selectedPage))
      window.scrollTo(0, 0)
    }
  
    return (
      count > 1 && (
        <Pagination
          count={pageCount}
          page={page}
          onPageChange={onPageChangeHandler}
        />
      )
    )
  }
  
