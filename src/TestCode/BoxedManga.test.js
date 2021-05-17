import { shallow } from "enzyme";
import BoxedManga from "../Controller/BoxedManga";
import reducer, { initialState } from "../Model/rootReducer";
import { StateProvider } from "../Model/StateProvider";
import { checkProps } from "./utils/utils";

const setUp = () => {
  const component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <BoxedManga />
    </StateProvider>
  );
  return component;
};
describe("Boxed Manga Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  describe("BoxedManga", () => {
    it("Should Render the Manga in the rent-box Component without errors", () => {
      const boxedManga = component;
      expect(boxedManga.length).toBe(1);
    });
  });
  describe("Checking PropTypes", () => {
    it("Should not throw a warning", () => {
      const expectedProps = {
        id: "Test Id",
        title: "Test Title",
        author: "Test Author",
        image: "Test Image",
        price: 100,
        rating: 100,
        description: "Test Description",
      };
      let propsErrors = checkProps(BoxedManga, expectedProps);
      expect(propsErrors).toBeUndefined();
    });
  });
});
