import type { MenuItem } from "@/configs/menu/menu";
import SidebarCollapseLg from "./SidebarCollapseLg";
import SidebarCollapseSm from "./SidebarCollapseSm";

interface Props {
   menuItem: MenuItem;
   isCollapseItem?: boolean;
   drawerIsCollapsed: boolean;
   collapseDrawer: () => void;
}

const SidebarCollapse: React.FC<Props> = ({
   menuItem,
   isCollapseItem = false,
   drawerIsCollapsed,
   collapseDrawer,
}) => {
   return (
      <>
         {!drawerIsCollapsed ? (
            <SidebarCollapseLg
               menuItem={menuItem}
               isCollapseItem={isCollapseItem}
               drawerIsCollapsed={drawerIsCollapsed}
               collapseDrawer={collapseDrawer}
            />
         ) : (
            <SidebarCollapseSm
               menuItem={menuItem}
               isCollapseItem={isCollapseItem}
               drawerIsCollapsed={drawerIsCollapsed}
               collapseDrawer={collapseDrawer}
            />
         )}
      </>
   );
};

export default SidebarCollapse;
