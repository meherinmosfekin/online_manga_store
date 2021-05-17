import { shallow } from "enzyme";
import Manga from "../Controller/Manga";
import Navbar from "../Controller/Navbar";
import { StateProvider } from "../Model/StateProvider";
import reducer, { initialState } from "../Model/rootReducer";
const setUp1 = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Navbar />
    </StateProvider>
  );
  return component;
};
const setUp2 = () => {
  let component = shallow(
    <StateProvider initialState={initialState} reducer={reducer}>
      <Manga />
    </StateProvider>
  );
  return component;
};
describe("Dashboard Component", () => {
  let component1, component2;
  beforeEach(() => {
    component1 = setUp1();
    component2 = setUp2();
  });
  describe("Navbar Component", () => {
    it("Should Render the Navbar Without Errors", () => {
      const navbar = component1;
      expect(navbar.length).toBe(1);
    });
  });

  describe("Manga Component", () => {
    it("Should Render 3 manga items on screen without error", () => {
      const manga = component2;
      expect(manga.length).toBe(1);
    });
  });
});
