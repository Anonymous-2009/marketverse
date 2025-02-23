import React from 'react';

const order = ({ id, email }: { id: number | null; email: string }) => {
  console.log(id, email);

  return <div>order</div>;
};

export default order;
