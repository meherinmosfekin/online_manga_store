import { shallow } from "enzyme";
import Manga from "../Controller/Manga";
import reducer, { initialState } from "../Model/rootReducer";
import { StateProvider } from "../Model/StateProvider";
import { checkProps } from "./utils/utils";

const setUp = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Manga />
    </StateProvider>
  );
  return component;
};
describe("Manga Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });
  it("Should Render 3 manga items on screen without error", () => {
    const manga = component;
    expect(manga.length).toBe(1);
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
      let propsErrors = checkProps(Manga, expectedProps);
      expect(propsErrors).toBeUndefined();
    });
  });
});
