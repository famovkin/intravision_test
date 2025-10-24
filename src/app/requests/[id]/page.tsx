'use client';

import { editRequest } from '@/lib/features/requests/requestsSlice';
import { useAppDispatch } from '@/lib/hooks';

const EditForm = () => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(editRequest());
  };

  return (
    <>
      <h1>EditForm</h1>
      <button onClick={onEdit}>Редактировать</button>
    </>
  );
};

export default EditForm;
