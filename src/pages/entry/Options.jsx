import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../context/OrderDetails";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    const controller = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, { signal: controller.signal })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        if (err.name !== "CanceledError") {
          setError(true);
        }
      });

    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((value) => (
    <ItemComponent
      key={value.name}
      name={value.name}
      imagePath={value.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}
