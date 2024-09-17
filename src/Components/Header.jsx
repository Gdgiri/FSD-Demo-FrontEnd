import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const path = useLocation().pathname;
  return (
    <div>
      <Navbar className="border-b-2">
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-2 bg-gradient-to-r from-violet-600 via-fuchsia-700 to-pink-500 rounded-lg text-white">
            Blogger
          </span>
          Hunt!
        </Link>
        <form>
          <TextInput
            type="text"
            placeholder="Search Blogs"
            rightIcon={AiOutlineSearch}
            className="hidden lg:inline "
          />
        </form>
        <Button
          className="w-12 h-9 lg:hidden text-dark"
          gradientDuoTone="purpleToPink"
          outline
          pill
        >
          <AiOutlineSearch />
        </Button>
        <div className="flex gap-2 md:order-2">
          <Button
            className="w-12 h-9 hidden sm:inline"
            gradientDuoTone="purpleToPink"
            outline
            pill
          >
            <FaMoon />
          </Button>
          <Link to="/signin">
            <Button gradientDuoTone="purpleToPink" outline pill>
              Signin
            </Button>
          </Link>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/about"} as={"div"}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path === "/blog"} as={"div"}>
            <Link to="/blog">Blogs</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
