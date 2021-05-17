import { shallow } from "enzyme";
import BoxedManga from "../Controller/BoxedManga";
import Total from "../Controller/Total";
import Rent from "../Controller/Rent";
import { StateProvider } from "../Model/StateProvider";
import reducer, { initialState } from "../Model/rootReducer";

const setUp1 = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <BoxedManga />
    </StateProvider>
  );
  return component;
};
const setUp2 = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Total />
    </StateProvider>
  );
  return component;
};
const setUp3 = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Rent />
    </StateProvider>
  );
  return component;
};

describe("Navbar Component", () => {
  let component1, component2, component3;
  beforeEach(() => {
    component1 = setUp1();
    component2 = setUp2();
    component3 = setUp3();
  });
  describe("BoxedManga Component", () => {
    it("Should Render Boxed Manga component Without Errors", () => {
      const boxedManga = component1;
      expect(boxedManga.length).toBe(1);
    });
  });
  describe("Total Component", () => {
    it("Should Render price from content component Without Errors", () => {
      const total = component2;
      expect(total.length).toBe(1);
    });
  });
  describe("Rent Component", () => {
    it("Should Render payment method and form content component Without Errors", () => {
      const rent = component3;
      expect(rent.length).toBe(1);
    });
  });
});
