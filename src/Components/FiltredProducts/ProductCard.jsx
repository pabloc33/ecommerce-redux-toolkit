import { Link, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { singleProduct } from "../../features";

const ProductCard = ({ id, name, text, img, price, colors }) => {
  const dispatch = useDispatch();
  const { type } = useParams();

  return (
    <Link to={`/filteredProducts/${type}/` + id}>
      <Card
        aria-label="card-btn"
        className="mt-6 w-full md:w-96"
        onClick={() => dispatch(singleProduct(id))}
      >
        <CardHeader color="blue-gray" className="relative h-56">
          <img
            //src={toString(img)}
            src={img}
            alt="img-blur-shadow"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {name}
          </Typography>
          <Typography>{text}</Typography>
        </CardBody>
        <CardFooter className="flex flex-col md:flex-row items-center justify-between py-3">
          <Typography variant="small" className="mb-2 md:mb-0 md:mr-2">
            ${price}
          </Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            {colors?.map((color, index) => {
              return (
                <i
                  data-testid={`color-${color}`}
                  className="fas fa-map-marker-alt fa-sm mt-[3px] rounded-full p-2 mr-2 md:mr-4"
                  key={index}
                  style={{ backgroundColor: color }}
                ></i>
              );
            })}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
