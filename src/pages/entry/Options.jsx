import axios from "axios";
import ScoopOptions from "./ScoopOptions";
import ToppingOptions from "./ToppingOptions";
import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";

export default function Options({ optionType }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((_err) => {
        //TODO
      });
  }, [optionType]);

	console.log(items)

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;

  const optionItems = items.map((value) => (
    <ItemComponent
      key={value.name}
      name={value.name}
      imagePath={value.imagePath}
    />
  ));

  return <Row>{optionItems}</Row>;
}
