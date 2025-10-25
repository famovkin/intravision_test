'use client';

import { editRequest } from '@/lib/features/requests/requestsSlice';
import { useAppDispatch } from '@/lib/hooks';
import Modal from '@/components/Modal/Modal';

import { modalPath } from '../layout';

const EditForm = () => {
  const dispatch = useAppDispatch();

  const onEdit = () => {
    dispatch(editRequest());
  };

  return (
    <Modal path={modalPath}>
      <h1>EditForm</h1>
      <button onClick={onEdit}>Редактировать</button>
    </Modal>
  );
};

export default EditForm;
