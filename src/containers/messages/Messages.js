import { NavBar } from "../navBar/Navbar";
import { DrawerContent } from "../drawerContent/DrawerContent";

export const Messages = () => {
  return (
    <>
      {/* Drawer */}
      <div className="drawer-mobile drawer">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div className="drawer-content flex flex-col bg-base-100">
          <NavBar title="Messages"/>
          {/* main content here */}
          {/* card */}
          <p className="p-4 text-center font-bold">Chat Here</p>
        </div>
        <DrawerContent />
      </div>
    </>
  );
};
