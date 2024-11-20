import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { FaGem } from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";
import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";
import "./SideBar.scss";
import { Link, useNavigate } from "react-router-dom";

const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;

  const navigate = useNavigate();

  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ cursor: "pointer" }}>
              <DiReact size={"3em"} color={"00bfff"} />
              <span onClick={() => navigate("/")}>Admin Sidebar</span>
            </div>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<MdDashboard />}>
              <Link to="/admins">Dashboard</Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu icon={<FaGem />} title="Features">
              <MenuItem>
                <Link to="/admins/manage-users">Manage Users</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/admins/manage-quizzes">Manage Quizzes</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/admins/manage-questions">Manage Questions</Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://haryphamdev.github.io/hoidanit-udemy/"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                &#169; Hỏi Dân IT Udemy
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
