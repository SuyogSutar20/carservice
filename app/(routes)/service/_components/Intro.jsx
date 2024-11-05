import Image from "next/image";
import React, { useContext, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../../../_utils/GlobalApi";
import { toast } from "sonner";
import { CartUpdateContext } from "../../../_context/CartUpdateContext";
import Cart from "../../../_components/Cart";

function Intro({ carServicenews }) {
  const { user } = useUser();
  const { cart, updateCart } = useContext(CartUpdateContext);
  const [addedItems, setAddedItems] = useState(new Set());

  const addToCartHandler = async (service) => {
    const data = {
      email: user?.primaryPhoneNumber?.phoneNumber,
      name: service.name,
      description: service.aboutservice,
      productImage: service.serviceimage[0]?.url || "No image",
      price: service.price,
      carServicenew: { connect: { slug: service.slug } }
    };

    toast("Adding to Cart...");
    try {
      await GlobalApi.AddToCart(data);
      updateCart([...cart, data]);  // Update global cart context
      setAddedItems(prev => new Set(prev).add(service.id));  // Update added items set
      toast("Added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast("Error while adding to cart");
    }
  };

  return (
    <div className="container">
      <div className="grid grid-cols-2 gap-1 m-auto">
        <div>
          {carServicenews.length > 0 ? (
            carServicenews.map((service) => (
              <div key={service.id} className="flex p-4">
                <div className="w-full">
                  <div className="p-2 flex gap-3 border rounded-xl">
                    <Image
                      src={service.serviceimage[0]?.url || '/no-image.png'}
                      alt={`Image of ${service.name}`}
                      width={200}
                      height={173}
                      className="object-cover w-[200px] h-[173px] rounded-xl"
                    />
                    <div>
                      <h1 className="font-bold">{service.name}</h1>
                      <p className="text-sm text-gray-400 line-clamp-2">{service.aboutservice}</p>
                      <p className="font-bold">₹{service.price}</p>
                      <List>
                        <ListItem>
                          {service.carType.map((type, index) => (
                            <ListItemText key={index}>{type}</ListItemText>
                          ))}
                        </ListItem>
                      </List>
                      <Stack direction="row" spacing={2}>
                        {addedItems.has(service.id) ? (
                          <CheckIcon color="success" />
                        ) : (
                          <IconButton
                            color="primary"
                            aria-label="add to shopping cart"
                            onClick={() => addToCartHandler(service)}
                          >
                            <AddShoppingCartIcon />
                          </IconButton>
                        )}
                      </Stack>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No services available</p>
          )}
        </div>
        <Cart cart={cart} />
      </div>
    </div>
  );
}

export default Intro;
