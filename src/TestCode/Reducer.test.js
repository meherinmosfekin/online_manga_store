import reducer, { getTotal } from "../Model/rootReducer";

describe("getTotal() Test", () => {
  let rentbox = [
    {
      title: "Test Title1",
      author: "Test Author1",
      image: "Test Image1",
      price: 100,
      rating: 100,
      description: "Test Description1",
    },
    {
      title: "Test Title2",
      author: "Test Author2",
      image: "Test Image2",
      price: 100,
      rating: 100,
      description: "Test Description2",
    },
    {
      title: "Test Title3",
      author: "Test Author3",
      image: "Test Image3",
      price: 100,
      rating: 100,
      description: "Test Description3",
    },
  ];

  it("Should Calculate the correct pricing for the given rentbox", () => {
    expect(getTotal(rentbox)).toBe(300);
  });
});

describe("Reducer", () => {
  describe("Should return default state", () => {
    const newState = reducer(null, []);
    expect(newState).toEqual(null);
  });
  let state = {
    user: null,
    userName: null,
    rentbox: [],
  };
  describe("Should return new state for ADD_TO_RENTBOX", () => {
    let item = {
      id: "Test Id",
      title: "Test Title",
      author: "Test Author",
      image: "Test Image",
      price: 100,
      rating: 100,
      description: "Test Description",
    };
    let expectedState = {
      user: null,
      userName: null,
      rentbox: [item],
    };
    const newState = reducer(state, {
      type: "ADD_TO_RENTBOX",
      item: item,
    });
    expect(newState).toStrictEqual(expectedState);
  });

  describe("Should return new state for REMOVE_FROM_RENTBOX", () => {
    let item = {
      id: "Test Id",
      title: "Test Title",
      author: "Test Author",
      image: "Test Image",
      price: 100,
      rating: 100,
      description: "Test Description",
    };
    let expectedState = {
      user: null,
      userName: null,
      rentbox: [],
    };
    const newState = reducer(state, {
      type: "REMOVE_FROM_RENTBOX",
      item: item,
    });
    expect(newState).toStrictEqual(expectedState);
  });

  describe("Should return new state for EMPTY_RENTBOX", () => {
    let item = {
      id: "Test Id",
      title: "Test Title",
      author: "Test Author",
      image: "Test Image",
      price: 100,
      rating: 100,
      description: "Test Description",
    };
    let expectedState = {
      user: null,
      userName: null,
      rentbox: [],
    };
    const newState = reducer(state, {
      type: "EMPTY_RENTBOX",
      item: item,
    });
    expect(newState).toStrictEqual(expectedState);
  });
});
