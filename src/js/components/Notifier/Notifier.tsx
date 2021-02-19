import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { SET_ERROR } from '@/features/actions';

export const Notifier = () => {
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!error && !!error.title) {
      toast.error(error.title, {
        position: 'top-right',
        onClose: () => dispatch({
          type: SET_ERROR,
          payload: {
            title: '',
            message: ''
          }
        })
      })

    }
  }, [error]);

  return <ToastContainer autoClose={4000} />;
}
