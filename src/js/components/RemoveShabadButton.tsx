/* eslint-disable react/prop-types */
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeMultipleShabads } from "@/features/actions";
import { TEXTS } from '@/constants';
import { showToast } from '@/util';

type FCProps = {
  id: number | undefined
}

export const RemoveShabadButton: React.FC<FCProps> = ({ id }) => {
  const dispatch = useDispatch()

  const onRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { id } = event.currentTarget.dataset

    dispatch(removeMultipleShabads(parseInt(id)))
    showToast(TEXTS.SHABAD_REMOVED_MESSAGE)
  }

  return (
    <button
      aria-label="Remove Shabad"
      title="Remove Shabad"
      className="remove-shabad"
      data-id={id}
      data-cy="delete-shabad"
      onClick={onRemove}></button>
  )
}