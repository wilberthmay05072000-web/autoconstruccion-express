import {
    createContext,
    useContext,
    useState
} from "react";

const CartContext = createContext();


export function CartProvider({ children }) {

    const [cartItems, setCartItems] =
        useState([]);


    const addToCart = ({
        product,
        store,
        quantity,
        option
    }) => {

        setCartItems(currentItems => {

            const existingItem =
                currentItems.find(
                    item =>
                        item.store.id === store.id &&
                        item.product.id === product.id &&
                        item.option.type === option.type &&
                        item.option.name === option.name
                );


            if (existingItem) {

                return currentItems.map(item =>

                    item === existingItem
                        ? {
                            ...item,
                            quantity:
                                item.quantity + quantity
                        }
                        : item

                );

            }


            return [
                ...currentItems,
                {
                    id: `${store.id}-${product.id}-${option.name}`,
                    store: {
                        id: store.id,
                        name: store.name
                    },
                    product,
                    quantity,
                    option
                }
            ];

        });

    };


    const removeFromCart = (itemId) => {

        setCartItems(currentItems =>
            currentItems.filter(
                item => item.id !== itemId
            )
        );

    };


    const updateQuantity = (
        itemId,
        quantity
    ) => {

        if (quantity < 1) {

            removeFromCart(itemId);

            return;
        }


        setCartItems(currentItems =>
            currentItems.map(item =>
                item.id === itemId
                    ? {
                        ...item,
                        quantity
                    }
                    : item
            )
        );

    };


    const clearCart = () => {
        setCartItems([]);
    };


    const totalItems =
        cartItems.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const total =
        cartItems.reduce(
            (total, item) =>
                total +
                item.option.price *
                item.quantity,
            0
        );


    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                total
            }}
        >

            {children}

        </CartContext.Provider>

    );
}


export function useCart() {

    return useContext(CartContext);

}