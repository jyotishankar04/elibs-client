import { CgProfile } from "react-icons/cg";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../features/books/bookSlice";

function NavMenu() {
  const image = useSelector((state: State) => state.userInfo.profileImage);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="bg-white p-0 py-0 rounded-full overflow-hidden flex justify-center items-center border-2"
        >
          <img
            className=" w-14 h-14 object-cover object-center"
            src={image}
            alt=""
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to={"/user/profile"} className="w-full h-full">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={"/book/upload"} className="w-full h-full">
              Upload Book
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={"/setting"} className="w-full h-full">
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem>GitHub</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            className="w-full"
            onClick={() => {
              localStorage.removeItem("token");
            }}
            to={"/auth/signup"}
          >
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NavMenu;
