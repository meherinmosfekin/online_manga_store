export const initialState = {
  user: null,
  userName: null,
  rentbox: [],
};

export const getTotal = (rentbox) =>
  rentbox.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_RENTBOX":
      return {
        ...state,
        rentbox: [...state.rentbox, action.item],
      };
    case "EMPTY_RENTBOX":
      return {
        ...state,
        rentbox: [],
      };
    case "REMOVE_FROM_RENTBOX":
      const index = state.rentbox.findIndex(
        (boxItem) => boxItem.id === action.id
      );

      let newBox = [...state.rentbox];
      if (index >= 0) {
        newBox.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove item, id:  ${action.id} does not exist in the box`
        );
      }

      return {
        ...state,
        rentbox: newBox,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        rentbox: action.rentbox,
      };

    default:
      return state;
  }
};

export default reducer;
