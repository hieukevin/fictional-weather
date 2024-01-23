import React from "react";

type Props = {
  title: string;
  data: string;
};
const ItemCondition = ({ title, data }: Props) => {
  return (
    <div className={`flex flex-col justify-center items-center`}>
      <p>{title}</p>
      <p>{data}</p>
    </div>
  );
};

export default ItemCondition;
